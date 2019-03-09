import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Game } from '../models/game';
import { GameService } from '../game.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Player } from '../models/player';
import { Board } from '../models/board';
import { Piece } from '../models/piece';

@Component({
    selector: 'app-winner',
    templateUrl: 'winner.page.html',
    styleUrls: ['winner.page.scss']
})

export class WinnerPage {

    game: Game;

    constructor(public navCtrl: NavController, private gameService: GameService, private screenOrientation: ScreenOrientation) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        this.game = gameService.getGame();

        //Design Time Data
        // this.game = new Game();
        // this.game.board = new Board();
        // this.game.isDraw = false;
        // this.game.pieces = [];
        // let player1 = new Player(0, "Player 1");
        // player1.score = 10;
        // let player2 = new Player(1, "Player 2");
        // player2.score = 5;
        // player2.isWinner = true;
        // this.game.players = [player1, player2];
        // let piece1 = new Piece(10, 0);
        // let piece2 = new Piece(3, 1);
        // let piece3 = new Piece(2, 1);
        // this.game.board.scoringPieces = [piece1, piece2, piece3];
    }

    reset() {
        this.navCtrl.navigateForward('/home?false=' + false);
    }
}
