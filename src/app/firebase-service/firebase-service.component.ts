import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) //makes this component global
export class FirestoreService {

  game; 
  singleGame;
  //firstGame;

  
  constructor(private firestore: Firestore) { 
    //onSnapshot needs a reference and a function
    this.game = onSnapshot(this.gameReference(), (games) => {
      // Iteration über jedes empfangene Spiel in Sammlung 'games' und Ausführung einer Aktion 
      games.forEach(element => {
        console.log('current game with onSnapshot: ', element);
      })
    });

    this.singleGame = onSnapshot(this.gameReference(), (snapshot) => {
      // Iteration über jedes empfangene Spiel in Sammlung 'games' und Ausführung einer Aktion
      snapshot.forEach(doc => {
        // Zugriff auf die Daten des Dokuments
        const data = doc.data();
        // Ausgabe des Werts des Felds 'game'
        console.log('current game with onSnapshot: ', data);
      })
    });

/**
 *     //try to get single element
    this.firstGame = onSnapshot(('games', '0qpdykQbqgFVuPijwoAb'), (element) => {

    })
 */

  }

  gameReference() {
    return collection(this.firestore, 'games');
  }

  getItems(): Observable<any[]> {
    const gameCollection = collection(this.firestore, 'game');
    const dataCollection = collectionData(gameCollection);  
    console.log('with Observable', dataCollection);
    return  dataCollection;
  }

      /**
         // Dies ist eine ASYNC PIPE 
         //Initialisierung des Observables mit Daten aus der Firestore-Sammlung 'notes'
        this.items$ = collectionData(this.getNotesRef());
        // Abonnieren des Observables, um auf Änderungen in der 'notes'-Sammlung zu reagieren
        this.items = this.items$.subscribe((list) => {
          // Iteration über jede empfangene Notiz und Ausführung einer Aktion (hier: Ausgabe in der Konsole)
          list.forEach(element => {
            console.log('Initialisierung des Observables mit collactionData()', element);
          })
        });
     */
}