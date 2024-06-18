import { CategoriesService } from '../../services/categories.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Categories } from '../../models/category';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.css',
})
export class CategoryNavbarComponent implements OnInit, OnDestroy {
  categories: Categories[] = [];

  private dataCategories: Subscription | null = null;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.dataCategories = this.categoryService.loadData().subscribe((data) => {
      this.categories = data;
    });
  }

  ngOnDestroy(): void {
    this.dataCategories?.unsubscribe();
  }
}
