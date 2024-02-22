import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where, Timestamp, getDoc } from '@angular/fire/firestore';
import { Game } from "../../game";
import { Unsubscribe } from '@firebase/firestore';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
}) //makes this SERVICE global

export class FirestoreService {
  // EventEmitter sends an event if game is updated
  singleGame?: Unsubscribe;
  game!: Game;
  gameId: string = '';
  gameTrigger = new Subject<any>(); 
  constructor(private firestore: Firestore) {
  }

  //besser eigener Name? wie 'triggertGame'
  serviceMethod(game: Game) {
    this.gameTrigger.next(game)
  }

  public async initGameListener(gameId: string, updateCallback: (gameDatas: Game) => void) {
    this.gameId = gameId;
    if (this.gameId) {      
      this.singleGame = onSnapshot(doc(this.firestore, 'games', this.gameId), (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          const firebaseDatas = documentSnapshot.data() as Game;
          updateCallback(firebaseDatas);
          console.log('after updateCallback', firebaseDatas);
          this.game = firebaseDatas;
          if (this.game && this.game.changeNow) {
            this.serviceMethod(this.game);
          }
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
      this.game = newGame;
      this.game.id = this.gameId;
      this.updateFirebase(this.game);
      return this.gameId;
    } else {
      const gameRef = doc(this.firestore, 'games', this.gameId);
      await this.updateFirebase(newGame);
      //await setDoc(gameRef, this.game.toJson(), { merge: true });
      return this.gameId;
    }
  }

  async updateFirebase(updateGame: Game) {
    this.game = updateGame;
    try {
      if (this.gameId) {
        const firebaseRef = doc(this.firestore, 'games', this.gameId);
        let newTimestamp = Timestamp.now().toMillis();
        this.game.timeStamp = newTimestamp;

        // set without merge will overwrite a document or create it if it doesn't exist yet
        // set with merge will update fields in the document or create it if it doesn't exists
        await setDoc(firebaseRef, updateGame.toJson(), { merge: false });
      } else {
        console.log('GameId does not exist.');
      }
    } catch (error) {
      console.error('Error in update: ', error);
    }
  }

  async updateCardInfo(cardTitle: string, description: string) {
    const gameRef = doc(this.firestore, 'games', this.gameId);
    await updateDoc(gameRef, { cardTitle: cardTitle, description: description });
    console.log(cardTitle, description);
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