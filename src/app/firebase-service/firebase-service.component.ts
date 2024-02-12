import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) //makes this component global
export class FirestoreService {
  constructor(private firestore: Firestore) { }

  getItems(): Observable<any[]> {
    debugger;
    const gameCollection = collection(this.firestore, 'games');
    return collectionData(gameCollection);    
  }
}