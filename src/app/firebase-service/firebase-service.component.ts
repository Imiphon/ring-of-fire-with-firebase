import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) //makes this component global
export class FirestoreService {

  //private firestore: Firestore
  constructor(private firestore: Firestore) { }

  getItems(): Observable<any[]> {
    const gameCollection = collection(this.firestore, 'games');
    const dataCollection = collectionData(gameCollection);  
    console.log(dataCollection);
     
    return  dataCollection;
  }
}