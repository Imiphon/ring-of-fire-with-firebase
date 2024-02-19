import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, onSnapshot, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where, Timestamp, getDoc } from '@angular/fire/firestore';
import { Game } from "./../../game";
import { Unsubscribe } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
}) //makes this component global

export class FirestoreService {
  singleGame?: Unsubscribe;
  gameOverview!: Game;
  gameId: string = '';

  constructor(private firestore: Firestore) {
  }

  public initGameListener(gameId:string, updateCallback: (gameDatas: Game) => void) {
    this.gameId = gameId;
    if (this.gameId) {
      this.singleGame = onSnapshot(doc(this.firestore, 'games', this.gameId), (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          console.log("Current data: ", documentSnapshot.data());
          const firebaseDatas = documentSnapshot.data() as Game; // Konvertiert die Snapshot-Daten in den Typ Game
          updateCallback(firebaseDatas); 
        } else {
          console.log("No such document!");
        }
      }, (error) => {
        console.error("Error getting document: ", error);
      });
    } else {
      console.log("gameId is not set. Cannot initialize listener.");
    }
  }

  async saveNewGame(newGame: Game): Promise<string> {
    if (this.gameId == '') {
      let newTimestamp = Timestamp.now().toMillis();
      newGame.timeStamp = newTimestamp;
      const docRef = await addDoc(collection(this.firestore, 'games'), newGame.toJson());
      this.gameId = docRef.id;
      this.gameOverview = newGame;
      this.gameOverview.id = this.gameId;
      this.updateFirebase(this.gameOverview);
      return this.gameId;
    } else {  //ready to delete???
      const gameRef = doc(this.firestore, 'games', this.gameId);
      await setDoc(gameRef, this.gameOverview.toJson(), { merge: true });
      return this.gameId;
    }
  }

  singleGameReference() {
    console.log('singleGameReferenz starts');
    
    const currentGame = onSnapshot(doc(this.firestore, 'games', this.gameId), (doc) => {
      if (doc.exists()) {
        console.log("Aktuelle Daten: ", doc.data());
      } else {
        console.log("Dokument existiert nicht!");
      }
    });
    return currentGame
  }

  async updateFirebase(updateGame: Game) {
    this.gameOverview = updateGame;
    try {
      if (this.gameId) {
        const firebaseRef = doc(this.firestore, 'games', this.gameId);
        let newTimestamp = Timestamp.now().toMillis();
        this.gameOverview.timeStamp = newTimestamp;

        // set without merge will overwrite a document or create it if it doesn't exist yet
        // set with merge will update fields in the document or create it if it doesn't exists
        await setDoc(firebaseRef, updateGame.toJson(), { merge: false });
        console.log('Game with ID: ' + this.gameId + ' is updated to: ', this.gameOverview);
      } else {
        console.log('GameId does not exist.');
      }
    } catch (error) {
      console.error('Error in update: ', error);
    }
  }

  async deleteOldGames() {
    console.log('deleteOldGames() works.');
    
    const hourAgo = Timestamp.now().toMillis() - (3 * 60 * 1000);
    const gamesRef = collection(this.firestore, 'games');
    const oldGame = query(gamesRef, where('timeStamp', '<=', hourAgo));

    const gameToDelete = await getDocs(oldGame);
    gameToDelete.forEach(async (document) => {
      await deleteDoc(doc(this.firestore, 'games', document.id));
      console.log(`Spiel ${document.id} wurde gelöscht, da es zu alt ist.`);
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