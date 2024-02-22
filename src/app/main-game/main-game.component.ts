import { Component, ViewChild, AfterViewInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
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
import { FirestoreService } from "../firebase-service/firebase-service";

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

export class MainGameComponent implements AfterViewInit {
  @ViewChild(GameInfoComponent) gameInfoComponent!: GameInfoComponent;
  //public pickCardAnimation = false;
  public game: Game = new Game();
  public currentCard: string = '';
  public gameIdDisplay: string = '';


  constructor(
    public dialog: MatDialog,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.sortNewOrOld();
    this.firestoreService.deleteOldGames();

    this.firestoreService.gameTrigger.subscribe(triggeredGame => {
      this.setNewOverview(triggeredGame);
    });
  }

  ngAfterViewInit(): void {
    this.gameInfoComponent.giveNewCardInfo();
  }

  setNewOverview(newDatas: Game) {
    this.game.id = this.gameIdDisplay;
    this.game.players = newDatas.players;
    this.game.stack = newDatas.stack;
    this.game.playedCards = newDatas.playedCards;
    this.game.currentCard = newDatas.currentCard;
    this.game.currentPlayerId = newDatas.currentPlayerId;
    this.game.timeStamp = newDatas.timeStamp;
    this.game.pickCardAnimation = newDatas.pickCardAnimation;
    this.game.cardTitle = newDatas.cardTitle;
    this.game.description = newDatas.description;
    this.game.changeNow = newDatas.changeNow;
  }

  async initGame() {
    try {
      //saveNewGame() only returns gameId 
      const gameId = await this.firestoreService.saveNewGame(this.game);
      if (gameId) {
        this.gameIdDisplay = this.firestoreService.gameId;

        this.router.navigate(['/gameStart/', gameId]);

        this.firestoreService.initGameListener(
          gameId, this.setNewOverview.bind(this)
        );
      }
    } catch (error) {
      console.error("Fehler beim Initialisieren des Spiels: ", error);
    }
  }

  sortNewOrOld() {
    this.route.paramMap.subscribe(parameters => {
      let gameId = parameters.get('gameId');
      if (gameId) {
        this.firestoreService.initGameListener(
          gameId, this.setNewOverview.bind(this)          
        );
        this.gameIdDisplay = gameId;
        console.log('got gameId: ', gameId);
      } else {
        this.initGame();
      }
    });
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      
      this.currentCard = this.game.stack.pop()!;
      this.game.currentCard = this.currentCard;
      this.game.pickCardAnimation = true;
      this.game.changeNow = true;
      this.ngAfterViewInit();
      this.firestoreService.updateFirebase(this.game);
    }
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.game.pickCardAnimation = false;
      this.game.currentPlayerId++;
      if (this.game.currentPlayerId == this.game.players.length) this.game.currentPlayerId = 0;
      this.game.changeNow = false;
      this.firestoreService.updateFirebase(this.game);
    }, 1300);
    //this.gameInfoComponent.giveNewCardInfo();
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

  copyId(gameIdDisplay: string): void {
    navigator.clipboard.writeText(gameIdDisplay).then(() => {
      this.snackBar.open('Paste it to yor invitation!', 'Close', {
        duration: 3000, // duration 2 sec
      });
    }, (err) => {
      console.error('Sorry, something went wrong! ', err);
    });
  }
}