import { Space } from "./space";
import { Piece } from "./piece";

export class Board {

    spaces: Array<Space>;
    suckedNumbers: Array<number>;
    suckedSpaces: Array<Space>;
    scoringPieces: Array<Piece>;

    constructor() {
        this.spaces = [];

        this.spaces.push(new Space(1, [2, 3]));
        this.spaces.push(new Space(2, [1, 3, 4, 5]));
        this.spaces.push(new Space(3, [1, 2, 5, 6]));
        this.spaces.push(new Space(4, [2, 5, 7, 8]));
        this.spaces.push(new Space(5, [2, 3, 4, 6, 8, 9]));
        this.spaces.push(new Space(6, [3, 5, 9, 10]));
        this.spaces.push(new Space(7, [4, 8, 11, 12]));
        this.spaces.push(new Space(8, [4, 5, 7, 9, 12, 13]));
        this.spaces.push(new Space(9, [5, 6, 8, 10, 13, 14]));
        this.spaces.push(new Space(10, [6, 9, 14, 15]));
        this.spaces.push(new Space(11, [7, 12, 16, 17]));
        this.spaces.push(new Space(12, [7, 8, 11, 13, 17, 18]));
        this.spaces.push(new Space(13, [8, 9, 12, 14, 18, 19]));
        this.spaces.push(new Space(14, [9, 10, 13, 15, 19, 20]));
        this.spaces.push(new Space(15, [10, 14, 20, 21]));
        this.spaces.push(new Space(16, [11, 17]));
        this.spaces.push(new Space(17, [11, 12, 16, 18]));
        this.spaces.push(new Space(18, [12, 13, 17, 19]));
        this.spaces.push(new Space(19, [13, 14, 18, 20]));
        this.spaces.push(new Space(20, [14, 15, 19, 21]));
        this.spaces.push(new Space(21, [15, 20]));
    }

    getBlackHole(): Space {
        for (var i = 0; i < this.spaces.length; i++) {
            if (this.spaces[i].containingPiece == null) {
                this.spaces[i].isBlackHole = true;
                this.spaces[i].animationState = "blackhole";
                return this.spaces[i];
            }
        }
    }

    getScoringPieces(blackHole: Space) {
        this.scoringPieces = [];

        for (var i = 0; i < blackHole.surroundingSpaces.length; i++) {
            this.spaces.find(s => s.id == blackHole.surroundingSpaces[i]).isSurrounding = true;
            this.spaces.find(s => s.id == blackHole.surroundingSpaces[i]).animationState = "sucked";
            this.scoringPieces.push(this.spaces.find(s => s.id == blackHole.surroundingSpaces[i]).containingPiece);
        }
    }
}