import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { PostsService } from '../../services/posts.service';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: { id: string; data: Post }[] = [];
  latestPosts: { id: string; data: Post }[] = [];

  private dataPosts: Subscription | null = null;
  private dataLatestPosts: Subscription | null = null;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.dataPosts = this.postsService.loadData().subscribe((data) => {
      this.posts = data;
    });
    this.dataLatestPosts = this.postsService
      .loadLatestData()
      .subscribe((data) => {
        this.latestPosts = data;
      });
  }

  ngOnDestroy(): void {
    this.dataPosts?.unsubscribe();
    this.dataLatestPosts?.unsubscribe();
  }
}
