import { Injectable } from '@angular/core';
import { Game } from './models/game';

@Injectable()
export class GameService {

    public game: Game;

    setGame(game: Game) {
        this.game = game;
    }

    getGame(): Game {
        return this.game;
    }
}