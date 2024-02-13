import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, onSnapshot, doc, addDoc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';
//import { MainGameComponent } from "./../main-game/main-game.component";
import { Game } from "./../../game";
import { Unsubscribe } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
}) //makes this component global

export class FirestoreService {
  game?: Unsubscribe;
  singleGame?: Unsubscribe;
  currentGame: Game[] = [];
  currentId = false;
  gameId: string = '';
  constructor(private firestore: Firestore) {
    this.initGameListener();
    this.initSingleGameListener();
  }

  private initGameListener() {
    const gameRef = this.gameReference();
    //onSnapshot needs a reference and a function
    this.game = onSnapshot(gameRef, (snapshot) => {
      // Iteration over each collection in games and action
      snapshot.forEach((doc) => {
        // Logik hier...
      });
    });
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
      const docRef = await addDoc(collection(this.firestore, 'games'), {

      });
      this.gameId = docRef.id
      console.log('Dokument geschrieben mit ID: ', docRef.id);
    } else {
      console.log('currentId exist');
      return;
    }
  }

  async updateGame(game: Game) {
  try {
    if (this.gameId) { // Stelle sicher, dass gameId gesetzt ist
      const gameRef = doc(this.firestore, 'games', this.gameId);
      await setDoc(gameRef, game.toJson(), { merge: true });
      console.log('Spiel aktualisiert mit ID: ', this.gameId);
    } else {
      console.log('Keine gameId vorhanden.');
    }
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Spiels: ', error);
  }
  }

/**
 *   //not used anymore
  getItems(): Observable<any[]> {
    const gameCollection = collection(this.firestore, 'game');
    const dataCollection = collectionData(gameCollection);
    console.log('with Observable', dataCollection);
    return dataCollection;
  }
 */
}