import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform, AlertController, NavParams } from '@ionic/angular';
import { Game } from '../models/game';
import { Piece } from '../models/piece';
import { GameService } from '../game.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    animations: [
        trigger('piece', [
            state('notPlayed', style({
                opacity: '0.5',
                transform: 'scale(0.75)'
            })),
            state('played', style({
                opacity: '1',
                transform: 'scale(1)'
            })),
            state('blackhole', style({
                opacity: '1',
                transform: 'scale(1)',
                backgroundColor: 'black',
                filter: 'blur(2px)'
            })),
            state('sucked', style({
                opacity: '0',
                transform: 'scale(0)'
            })),
            transition('notPlayed => played', animate('500ms linear')),
            transition('played => notPlayed', animate('500ms ease-in')),
            transition('notPlayed => blackhole', animate('500ms ease-in')),
            transition('played => sucked', animate('2000ms ease-out'))
        ])
    ]
})

export class HomePage {
    moves: Array<[number, Piece]>;
    game: Game;
    canUndo: boolean;
    subscription: any;
    ai: boolean;
    isEnabled: boolean;

    constructor(private changeDetector: ChangeDetectorRef, public navCtrl: NavController, private gameService: GameService, private platform: Platform,
        public alertCtrl: AlertController, private screenOrientation: ScreenOrientation, private statusBar: StatusBar) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        this.statusBar.backgroundColorByName("white");
        this.game = new Game();
        this.moves = [];
        this.canUndo = false;
        this.ai = false;
        this.isEnabled = true;
    }

    ionViewWillEnter() {
        if (this.platform.getQueryParam("false") == 'false') {
            this.restart();
        }
    }

    ionViewDidEnter() {
        this.subscription = this.platform.backButton.subscribeWithPriority(1, () => {
            navigator['app'].exitApp();
        });
    }

    ionViewWillLeave() {
        this.subscription.unsubscribe();
    }

    async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async changeAi(gameType) {
        if (this.game.pieces.length == 20) {
            this.ai = !this.ai;
        } else {
            const alert = await this.alertCtrl.create({
                header: "VS " + gameType.toUpperCase(),
                message: "Are you sure you want to change to play vs " + gameType + "? This will reset your current game.",
                buttons: [
                    {
                        text: 'No',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {

                        }
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            this.ai = !this.ai;
                            this.restart();
                        }
                    }
                ]
            });
            await alert.present();
        }
    }

    async addPiece(boardSpace: number) {
        if (this.game.board.spaces[boardSpace].containingPiece == null || this.game.board.spaces[boardSpace].containingPiece == undefined) {

            this.moves.push([boardSpace, this.game.pieces[0]]);
            this.canUndo = true;

            this.game.board.spaces[boardSpace].containingPiece = this.game.pieces[0];
            this.game.board.spaces[boardSpace].animationState = "played";
            this.changeDetector.detectChanges();
            this.game.pieces.splice(0, 1);

            if (this.ai == true && this.game.pieces.length > 0 && this.game.pieces[0].player == 1) {
                let aiSpace = this.chooseAiSpace();
                this.isEnabled = false;
                await this.delay(500);
                this.addPiece(aiSpace - 1)
                this.isEnabled = true;
            }

            this.checkForEndGame()
        }
    }

    private chooseAiSpace() {
        let leastEmptySpaces = 100;
        let choosenSpace = [];
        let remainingSpaces = this.game.board.spaces.filter(s => s.containingPiece == null || s.containingPiece == undefined)

        remainingSpaces.forEach(remainingSpace => {
            let empty = 0;
            remainingSpace.surroundingSpaces.forEach(surroundingSpace => {
                if (this.game.board.spaces[surroundingSpace - 1].containingPiece == null || this.game.board.spaces[surroundingSpace - 1].containingPiece == undefined) {
                    empty += 1;
                }
            });

            if (leastEmptySpaces > empty) {
                leastEmptySpaces = empty;
                choosenSpace = [];
                choosenSpace.push(remainingSpace.id);
            } else if (leastEmptySpaces == empty) {
                choosenSpace.push(remainingSpace.id);
            }
        });
        return choosenSpace[Math.floor(Math.random() * choosenSpace.length)];
    }

    async checkForEndGame() {
        if (this.game.pieces.length == 0) {
            this.game.board.getScoringPieces(this.game.board.getBlackHole());
            this.game.workOutWinner(this.game.board.scoringPieces);
            await this.delay(2500);
            this.gameService.setGame(this.game);
            this.navCtrl.navigateForward('/winner');
        }
    }

    undo() {
        let numberOfUndos = 0;
        if (this.ai == false) {
            numberOfUndos = 1;
        } else {
            numberOfUndos = 2;
        }

        for (var i = 0; i < numberOfUndos; i++) {
            let move = this.moves.pop();
            this.game.board.spaces[move[0]].containingPiece = null;
            this.game.board.spaces[move[0]].animationState = "notPlayed";

            this.game.pieces.splice(0, 0, move[1]);

            if (this.moves.length == 0) {
                this.canUndo = false;
            }
        }
    }

    restart() {
        this.game = new Game();
        this.moves = [];
        this.canUndo = false;
    }

    navigate(page) {
        this.navCtrl.navigateForward('/' + page.toLowerCase());
    }
}
