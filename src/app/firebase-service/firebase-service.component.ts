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
  game!: Game;
  gameId: string = '';

  constructor(private firestore: Firestore) {
  //  this.initGameListener();
       
  }

  async saveGame(game: Game): Promise<string> {    
    if (!game.id) {
      const docRef = await addDoc(collection(this.firestore, 'games'), game.toJson());
      game.id = docRef.id; // Speichert die generierte ID im Game-Objekt
      return docRef.id;
    } else {
      const gameRef = doc(this.firestore, 'games', game.id);
      await setDoc(gameRef, game.toJson(), { merge: true });
      return game.id;
    }
  }

  singleGameReference() {
    const currentGame = onSnapshot(doc(this.firestore, "games", this.gameId), (doc) => {
      if (doc.exists()) {
        console.log("Aktuelle Daten: ", doc.data());
      } else {
        console.log("Dokument existiert nicht!");
      }
    });
    return currentGame
  }

  async updateFireGame(game: Game) {
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
    const oneHour = Timestamp.now().toMillis() - (60 * 60 * 1000); // 60 Min in Millisec
    const gamesRef = collection(this.firestore, 'games');
    const q = query(gamesRef, where('timeStamp', '<=', new Date(oneHour).toISOString()));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
     // await deleteDoc(doc.ref);
      console.log(`Spiel ${doc.id} könnte gelöscht werden, da es zu alt ist.`);
    });
  }

  async checkGameExists(gameId: string): Promise<boolean> {
    const gameRef = doc(this.firestore, 'games', gameId);
    const docSnap = await getDoc(gameRef);
    if (docSnap) {
      this.gameId = gameId;
    }
    return docSnap.exists();
  }
}

/**
 * //Get infos for all documents
    private initGameListener() {
    const gameRef = this.gameReference(); // = 'games' on firebase
    this.singleGame = onSnapshot(gameRef, (snapshot) => {
      // Iteration over each collection in games and action
      snapshot.forEach((doc) => {
        const data = doc.data();
        //console.log('current game with onSnapshot: ', data);
      });
    });
  }

  gameReference() {
    return collection(this.firestore, 'games');
  }
 */

/**
 *   async createGame() {    
    if (this.gameId == '') {
      this.game = new Game(); // init new Game Object
      const currTimeStamp = new Date().toISOString(); 
      this.game.timeStamp = currTimeStamp;           
      console.log('toJson contain: ', this.game.toJson);
      
      
      const docRef = await addDoc(collection(this.firestore, 'games'), this.game.toJson());
      this.gameId = docRef.id; 
      console.log('New Doc with ID: ', docRef.id);
      console.log('timeStamp: ', currTimeStamp);
      return docRef.id; 
    } else {
      console.log('existingId is', this.gameId);
      return this.gameId; 
    }
  }
 */



/**
 * //Get infos for all documents
    private initGameListener() {
    const gameRef = this.gameReference(); // = 'games' on firebase
    this.singleGame = onSnapshot(gameRef, (snapshot) => {
      // Iteration over each collection in games and action
      snapshot.forEach((doc) => {
        const data = doc.data();
        //console.log('current game with onSnapshot: ', data);
      });
    });
  }

  gameReference() {
    return collection(this.firestore, 'games');
  }
 */

/**
 *   async createGame() {    
    if (this.gameId == '') {
      this.game = new Game(); // init new Game Object
      const currTimeStamp = new Date().toISOString(); 
      this.game.timeStamp = currTimeStamp;           
      console.log('toJson contain: ', this.game.toJson);
      
      
      const docRef = await addDoc(collection(this.firestore, 'games'), this.game.toJson());
      this.gameId = docRef.id; 
      console.log('New Doc with ID: ', docRef.id);
      console.log('timeStamp: ', currTimeStamp);
      return docRef.id; 
    } else {
      console.log('existingId is', this.gameId);
      return this.gameId; 
    }
  }
 */

