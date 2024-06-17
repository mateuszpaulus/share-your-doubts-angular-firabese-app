import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  onSnapshot,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private fireStore: Firestore) {}

  loadData(): Observable<{ id: string; data: { category: string } }[]> {
    const docRef = collection(this.fireStore, 'categories');
    return new Observable((observer) => {
      onSnapshot(
        query(docRef),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: { category: doc.data()['category'] },
          }));
          observer.next(data);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
