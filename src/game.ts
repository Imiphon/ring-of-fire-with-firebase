export class Game {
    //coming from LandingPageComponent if it still exist 
    public id?: string = '';

    public players: string[] = ['Anna', 'Egon', 'Herbert'];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayerId: number = 0;
    public timeStamp: number = 0;
    public pickCardAnimation: boolean = false;
    public cardTitle!: string;
    public description!: string;
    public changeNow: boolean = false;
    public currentCard: string = '';

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('spade_' + i);
            this.stack.push('club_' + i);
            this.stack.push('diamond_' + i);
            this.stack.push('heart_' + i);
        }
        shuffle(this.stack);
    }

    toJson() {
        return {
            id: this.id,
            players: this.players,
            stack: this.stack,
            currentCard: this.currentCard,
            playedCards: this.playedCards,
            currentPlayerId: this.currentPlayerId,
            timeStamp: this.timeStamp,
            pickCardAnimation: this.pickCardAnimation,
            cardTitle: this.cardTitle || 'Title',
            description: this.description || 'Description',
            changeNow: this.changeNow
        }
    }
}

/**
 * Implementation of fisher-yates-shuffle-algorythm
 * @param array 
 * @returns 
 * IMPORTANT: function has to be OUTSIDE the object
 */
function shuffle(array: string[]): string[] {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

