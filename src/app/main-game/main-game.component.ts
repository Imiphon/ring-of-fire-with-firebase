import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; //Hier wird das CommonModule aus dem @angular/common-Paket importiert. Dieses Modul stellt allgemeine Direktiven, Pipes und Services bereit, die in vielen Angular-Anwendungen verwendet werden. Beispiele sind Direktiven wie ngIf und ngFor. Es wird häufig in Feature-Modulen importiert, um diese allgemeinen Funktionen zugänglich zu machen.
import { RouterOutlet } from '@angular/router'; // Diese Zeile importiert RouterOutlet aus dem @angular/router-Paket. RouterOutlet ist eine Direktive in Angular, die als Platzhalter fungiert, an dem geroutete Ansichten (Komponenten) im Template einer Anwendung angezeigt werden. Es wird in Templates verwendet, um anzugeben, wo der Inhalt einer gerouteten Komponente gerendert werden soll.
import { Game } from "./../../game";
import { PlayerComponent } from "./../player/player.component";
import { DialogAddPlayerComponent } from "./../dialog-add-player/dialog-add-player.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { GameInfoComponent } from "./../game-info/game-info.component";


@Component({
  selector: 'app-main-game',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    GameInfoComponent,
    MatCardModule
  ],
  templateUrl: './main-game.component.html',
  styleUrl: './main-game.component.scss'
})

export class MainGameComponent {
  public pickCardAnimation = false;
  //shows all cards in stack, all players
  public game: Game = new Game();
  public currentCard: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.newGame();
  }

  /**
   * creates a new Game Object with reuirements from Game
   */
  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      console.log('currrentPlayer: ', this.game.currentPlayer);
    }
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;

    }, 1300);
    console.log('players.length: ', this.game.players.length);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe(name => {
      this.game.players.push(name);
      console.log(this.game.players);
    });
  }
}

/**
  takeCard() {
    this.pickCardAnimation = false;  
    this.pickCardAnimation = true;
      if (this.game.stack.length > 0) {    
        //to make sure for ng-array never empty write: !
        this.currentCard = this.game.stack.pop()!;
      } else {
        this.currentCard = '';
      }
      //this.pickCardAnimation = true;
  }

    takeCard() {
  if (!this.pickCardAnimation) {
    if (this.game.stack.length > 0) {    
      //to make sure for ng-array never empty write: !
      this.currentCard = this.game.stack.pop()!;
    } else {
      this.currentCard = '';
    }
  }  
  this.pickCardAnimation = true;
  setTimeout(() => {
    this.pickCardAnimation = false;
    this.game.currentPlayer++;
    console.log('player: ', this.game.currentPlayer);  
    if (this.game.currentPlayer == this.game.players.length) {
      this.game.currentPlayer = 0;  
      
    }
    
  }, 1300);
  console.log('players.length: ', this.game.players.length);
  }
 */

