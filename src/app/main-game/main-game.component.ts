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
import { FirestoreService } from "./../firebase-service/firebase-service.component";

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

  constructor(public dialog: MatDialog, private firestoreService: FirestoreService) {
  }

  ngOnInit() {
    this.newGame();
  }

  /**
   * creates a new Game Object with reuirements from Game
   */
  newGame() {
    this.game = new Game();
    this.firestoreService.createGame();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      let currentName: string = this.game.players[this.game.currentPlayerId];
    }
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;

      this.game.currentPlayerId++;
      if (this.game.currentPlayerId == this.game.players.length) this.game.currentPlayerId = 0;
    }, 1300);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef
      .afterClosed()
      .subscribe(name => {
        this.game.players.push(name);
        //Update inside the callback to get it DIRECTLY to firebase cloud
        this.firestoreService.updateGame(this.game); 
      });
      
  }
}
