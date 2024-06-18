import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';
import { Subscription } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '../../models/category';

@Component({
  selector: 'app-single-category',
  standalone: true,
  imports: [PostCardComponent, CommonModule],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css',
})
export class SingleCategoryComponent implements OnInit, OnDestroy {
  categoriesPosts: { id: string; data: Post }[] = [];
  params: { [key: string]: string } = {};
  private dataCategoriesPosts: Subscription | null = null;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataCategoriesPosts = this.route.params.subscribe((params) => {
      this.params = params;
      this.postsService.loadCategoryPosts(params['id']).subscribe((data) => {
        this.categoriesPosts = data;
      });
    });
  }

  ngOnDestroy(): void {
    this.dataCategoriesPosts?.unsubscribe();
  }
}
