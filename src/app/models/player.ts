export class Player {

    id: number;
    name: string;
    score: number;
    isWinner: boolean;
    colour: string;

    constructor(_id: number, _name: string) {
        this.id = _id;
        this.name = _name;
        this.score = 0;
        this.isWinner = false;
    }
}