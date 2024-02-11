export class Game {

    public players: string[] = ['Anna', 'Egon', 'Herbert'];
    public stack: string[] = [];
    public playedCards:  string[] = [];
    public currentPlayerId:  number = 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('spade_'+ i);
            this.stack.push('club_'+ i);
            this.stack.push('diamond_'+ i);
            this.stack.push('heart_'+ i);
        }
        shuffle(this.stack);
    }
}

/**
 * Implementation of fisher-yates-shuffle-algorythm
 * @param array 
 * @returns 
 * IMPORTANT: function has to be OUTSIDE the object
 */
function shuffle(array: string[]):string[] {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        //
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}