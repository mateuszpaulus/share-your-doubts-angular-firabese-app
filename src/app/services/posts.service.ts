import {Injectable} from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Post} from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private fireStore: Firestore) {
  }

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

  loadLatestData(): Observable<{ id: string; data: Post }[]> {
    const docRef = collection(this.fireStore, 'posts');
    const q = query(docRef, orderBy('createdAt'));

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

  loadCategoryPosts(
    categoryId: string,
    limit?: number
  ): Observable<{ id: string; data: Post }[]> {
    const docRef = collection(this.fireStore, 'posts');
    const q = query(docRef, where('category.categoryId', '==', categoryId));

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

  loadPost(postId: string): Observable<{ id: string; data: Post }> {
    const docRef = doc(this.fireStore, 'posts', postId);

    return new Observable((observer) => {
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            const postData = {
              id: doc.id,
              data: doc.data() as Post,
            };
            observer.next(postData);
          } else {
            observer.error(new Error(`Post with ID ${postId} does not exist`));
          }
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  countViews(postId: string) {
    const docRef = doc(this.fireStore, 'posts', postId);

    updateDoc(docRef, {
      views: increment(1)
    });

  }
}
