import {Injectable} from '@angular/core';
import {addDoc, collection, Firestore, getDocs, query, where} from "@angular/fire/firestore";
import {Sub} from "../models/sub";
import {from, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private fireStore: Firestore) {
  }

  addSubs(subData: Sub) {
    const docRef = collection(this.fireStore, 'subscribers');
    addDoc(docRef, subData)
  }
  
  checkSubs(subEmail: string): Observable<boolean> {
    const docRef = collection(this.fireStore, 'subscribers');
    const q = query(docRef, where('email', '==', subEmail));

    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        return querySnapshot.empty;
      })
    );
  }
}
