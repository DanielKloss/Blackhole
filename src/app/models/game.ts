import { Player } from "./player";
import { Piece } from "./piece";
import { Board } from "./board";

export class Game {
    players: Array<Player>;
    pieces: Array<Piece>;
    board: Board;
    isDraw: boolean;

    constructor() {
        this.isDraw = false;

        this.players = [new Player(0, "Player 1"), new Player(1, "Player 2")];
        this.board = new Board();
        this.pieces = [];

        for (var i = 1; i < 11; i++) {
            for (var j = 0; j < 2; j++) {
                this.pieces.push(new Piece(i, j))
            }
        }
    }

    workOutWinner(scoringPieces: Array<Piece>) {
        for (var i = 0; i < scoringPieces.length; i++) {
            this.players.find(p => p.id == scoringPieces[i].player).score += scoringPieces[i].value;
        }

        if (this.players.find(p => p.id == 0).score > this.players.find(p => p.id == 1).score) {
            this.players.find(p => p.id == 1).isWinner = true;
        } else if (this.players.find(p => p.id == 1).score > this.players.find(p => p.id == 0).score) {
            this.players.find(p => p.id == 0).isWinner = true;
        } else {
            this.isDraw = true;
        }
    }
}