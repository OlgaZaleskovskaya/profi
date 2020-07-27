import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { Category } from './category.model';
import * as CategoriesActions from './store/categories.actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categoriesSubscription: Subscription;
  categoriesList: Category[];
  currentCategoryId: string;
  currentCategoryIndex: number;
  currentTag: string;

  postSubscription: Subscription;
  postsPerPage: number;
  currentPage: number;

  vis: boolean;
  x: number = 15.45;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.vis = true;
    this.currentCategoryIndex = -1;
    this.categoriesList = [];
    this.store.dispatch(new CategoriesActions.GetCategories());
    this.categoriesSubscription = this.store.select('categories').subscribe((state) => {
      this.categoriesList = [...state.categoriesList];
      this.currentCategoryId = state.currentCategoryId;
    //  this.currentTag = state.currentTag;
    }
    );

    this.postSubscription = this.store.select('posts').subscribe(state => {
      this.postsPerPage = state.postsPerPage; // ???
      this.currentPage = state.currentPage;  // ??? depends upon
    })
  };

  onSelectCategory(i: number, category: Category) {
    this.currentCategoryIndex = i;
    this.currentCategoryId = category.id;
    this.store.dispatch(new CategoriesActions.SelectCategory(category));
  }

  onRemoveCategory() {
    this.store.dispatch(new CategoriesActions.DeleteCategoryStart(this.currentCategoryId));
  }

  onTagSelected(tag: string) {
    this.currentTag = tag;
    this.store.dispatch(new CategoriesActions.SelectTag({ postsPerPage: this.postsPerPage, currentPage: 1, currentTag: tag }));
  }

  onRemoveFilters(){
    this.store.dispatch(new CategoriesActions.SelectTag({ postsPerPage: this.postsPerPage, currentPage: 1, currentTag: '' }));

  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
    this.postSubscription.unsubscribe();
  }
}
