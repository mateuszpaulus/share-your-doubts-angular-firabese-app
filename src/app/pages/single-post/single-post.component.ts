import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostCardComponent} from '../../layouts/post-card/post-card.component';
import {CommentFormComponent} from '../../comments/comment-form/comment-form.component';
import {CommentListComponent} from '../../comments/comment-list/comment-list.component';
import {PostsService} from '../../services/posts.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Post} from '../../models/post';
import {CommonModule, DatePipe} from '@angular/common';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    PostCardComponent,
    CommentFormComponent,
    CommentListComponent,
    DatePipe,
    CommonModule,
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements OnInit, OnDestroy {
  post = {} as { id: string; data: Post };
  similarPost = {} as { id: string; data: Post }[];
  private dataPost: Subscription | null = null;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.dataPost = this.route.params.subscribe((params) => {
      this.postsService.countViews(params['id']);
      this.postsService.loadPost(params['id']).subscribe((data) => {
        this.post = data;
        this.loadSimilarPost(data.data.category.categoryId);
      });
    });
  }

  loadSimilarPost(id: string): void {
    this.postsService.loadCategoryPosts(id).subscribe((data) => {
      this.similarPost = data;
    });
  }

  convertTimestampToDate(timestamp: Date): Date {
    if (timestamp instanceof Date) {
      return timestamp;
    }

    const {seconds, nanoseconds} = timestamp;
    return new Date(seconds * 1000 + nanoseconds / 1000000);
  }

  ngOnDestroy(): void {
    this.dataPost?.unsubscribe();
  }
}
