import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, onSnapshot, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where, Timestamp, getDoc} from '@angular/fire/firestore';
//import { Observable } from 'rxjs';
//import { MainGameComponent } from "./../main-game/main-game.component";
import { Game } from "./../../game";
import { Unsubscribe } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
}) //makes this component global

export class FirestoreService {
  //game?: Unsubscribe;
  singleGame?: Unsubscribe;
  currentGame!: Game;
  currentId = false;
  gameId: string = '';

  constructor(private firestore: Firestore) {
    //this.initGameListener();
    this.initSingleGameListener();    
  }

  private initSingleGameListener() {
    const gameRef = this.gameReference();
    this.singleGame = onSnapshot(gameRef, (snapshot) => {
      // Iteration over each collection in games and action
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log('current game with onSnapshot: ', data);
      });
    });
  }

  gameReference() {
    return collection(this.firestore, 'games');
  }

  async createGame() {
    if (!this.currentId) {
      this.currentGame = new Game(); // init new Game Object
      const currTimeStamp = new Date().toISOString(); 
      this.currentGame.timeStamp = currTimeStamp;           
      console.log('toJson contain: ', this.currentGame.toJson);
      
      const docRef = await addDoc(collection(this.firestore, 'games'), this.currentGame.toJson());
      this.gameId = docRef.id; 
      console.log('New Doc with ID: ', docRef.id);
      console.log('timeStamp: ', currTimeStamp);
      return docRef.id; 
    } else {
      console.log('currentId exist');
      return ''; //if no gameId exists 
    }
  }

  async updateGame(game: Game) {
    try {
      if (this.gameId) { 
        const gameRef = doc(this.firestore, 'games', this.gameId);
        // set without merge will overwrite a document or create it if it doesn't exist yet
        // set with merge will update fields in the document or create it if it doesn't exists
        await setDoc(gameRef, game.toJson(), { merge: true });
        console.log('Game with ID: ' + this.gameId + ' is updated');
      } else {
        console.log('GameId does not exist.');
      }
    } catch (error) {
      console.error('Error in update: ', error);
    }
  }

  async deleteOldGames() {
    const fiveMinutesAgo = Timestamp.now().toMillis() - (5 * 60 * 1000); // 5 Min in Millisec
    const gamesRef = collection(this.firestore, 'games');
    const q = query(gamesRef, where('timeStamp', '<=', new Date(fiveMinutesAgo).toISOString()));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`Spiel ${doc.id} gelöscht, da es älter als 5 Minuten ist.`);
    });
  }

  async checkGameExists(gameId: string): Promise<boolean> {
    const gameRef = doc(this.firestore, 'games', gameId);
    const docSnap = await getDoc(gameRef);
    return docSnap.exists();
  }

}

