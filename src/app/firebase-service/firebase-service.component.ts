import { Injectable } from '@angular/core';
//import { Game } from './../../game'

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) { }

  getItems(): Observable<any[]> {
    debugger;
    const gameCollection = collection(this.firestore, 'games');
    return collectionData(gameCollection);    
  }
}