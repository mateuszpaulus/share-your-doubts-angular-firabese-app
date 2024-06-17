import { Component } from '@angular/core';
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
export class HomeComponent {
  posts: { id: string; data: Post }[] = [];
  private dataPosts: Subscription | null = null;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.dataPosts = this.postsService.loadData().subscribe((data) => {
      this.posts = data;
    });
  }

  ngOnDestroy(): void {
    this.dataPosts?.unsubscribe();
  }
}
