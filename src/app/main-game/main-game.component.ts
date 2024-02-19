import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet, ActivatedRoute } from '@angular/router'; 
import { Game } from "./../../game";
import { PlayerComponent } from "./../player/player.component";
import { DialogAddPlayerComponent } from "./../dialog-add-player/dialog-add-player.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from "@angular/material/snack-bar";
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
    MatCardModule,
  ],
  templateUrl: './main-game.component.html',
  styleUrl: './main-game.component.scss'
})

export class MainGameComponent {
  //public pickCardAnimation = false;
  public game: Game = new Game();
  public currentCard: string = '';
  public gameIdDisplay: string = '';

  constructor(
    public dialog: MatDialog, 
    private firestoreService: FirestoreService, 
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {    
    this.sortNewOrOld();
    this.firestoreService.deleteOldGames();
    this.firestoreService.singleGameReference();  
  }

  setNewOverview(newDatas: Game) {
    this.game.players = newDatas.players;
    this.game.stack = newDatas.stack;
    this.game.playedCards = newDatas.playedCards;
    this.game.currentPlayerId = newDatas.currentPlayerId;
    this.game.timeStamp = newDatas.timeStamp;
    this.game.pickCardAnimation = newDatas.pickCardAnimation;
  }

  sortNewOrOld() {
    this.route.paramMap.subscribe(parameters => {
      let gameId = parameters.get('gameId');
      if(gameId){
       this.firestoreService.initGameListener(
        gameId, this.setNewOverview.bind(this)
       );
        this.gameIdDisplay = gameId; 
        console.log('got gameId: ', gameId);
      } else {
        this.firestoreService.saveNewGame(this.game).then(gameId => {
          this.gameIdDisplay = gameId; 
        });
      }
    });
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.firestoreService.updateFirebase(this.game); 
     // let currentName: string = this.game.players[this.game.currentPlayerId];
    }
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.game.pickCardAnimation = false;
      this.game.currentPlayerId++;
      if (this.game.currentPlayerId == this.game.players.length) this.game.currentPlayerId = 0;
      this.firestoreService.updateFirebase(this.game); 
    }, 1300);
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef
      .afterClosed()
      .subscribe(name => {
        this.game.players.push(name);
        //Update inside the callback to set it DIRECTLY to firebase cloud
        this.firestoreService.updateFirebase(this.game); 
      });      
  }

  copyId(gameIdDisplay:string): void {
    navigator.clipboard.writeText(gameIdDisplay).then(() => {
      this.snackBar.open('Paste it to yor invitation!', 'Schließen', {
        duration: 3000, // duration 2 sec
      });
    }, (err) =>{
        console.error('Da lief was schief! ', err);
      });
  }

}