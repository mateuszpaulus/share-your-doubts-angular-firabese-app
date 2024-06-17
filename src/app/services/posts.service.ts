import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  limit,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private fireStore: Firestore) {}

  loadData(): Observable<{ id: string; data: Post }[]> {
    const docRef = collection(this.fireStore, 'posts');
    const q = query(docRef, where('isFeatured', '==', true), limit(4));

    return new Observable((observer) => {
      onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data() as Post,
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
