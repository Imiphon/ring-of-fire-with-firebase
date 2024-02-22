import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FirestoreService } from "./../firebase-service/firebase-service";

import { Game } from "./../../game";

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})

export class GameInfoComponent {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'The player says a word, and in clockwise order each player must say a word that rhymes with it. The first person who can not find a rhyme or hesitates too long has to drink.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'The player asks someone a question. That person has to answer with another question, and so on. The first person who does not ask a question or hesitates too long has to drink.' },
    { title: 'Never have I ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  cardTitle: string = 'InfoCard Titles';
  description: string = 'Pick a card and follow instructions.';
  number: number = 0;
  @Input() card: string = ''; //If any changes here then ngOnChanges() is calling
  game!: Game;

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() { }

  ngOnChanges(): void {
    this.number = +this.card.split('_')[1];
    // check if index != NaN
    if (this.number >= 0 && this.number <= this.cardAction.length) {
      this.cardTitle = this.cardAction[this.number - 1].title;
      this.description = this.cardAction[this.number - 1].description;
            
      this.firestoreService.updateCardInfo(this.cardTitle, this.description);      
    }
  }

 giveNewCardInfo() {
   this.number = +this.card.split('_')[1];
   // check if index != NaN
   if (this.number >= 0 && this.number <= this.cardAction.length && this.game) {
     this.game.cardTitle = this.cardAction[this.number - 1].title;
     this.game.description = this.cardAction[this.number - 1].description;
   }
 }

 
}


