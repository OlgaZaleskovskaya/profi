import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { MatDialog } from '@angular/material/dialog'
import { Category } from '../categories/category.model';
import * as PostsActions from '../posts/store/posts.actions';
import { FormGroup } from '@angular/forms';
import { Post, CreatePostData } from '../posts/post.model';
import { Subscription } from 'rxjs';
import { FetchedUser } from '../auth/auth.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  categorySubscription: Subscription;
  authSubscription: Subscription;
  user: FetchedUser;
  categories: Category[];
  isCreatePost = false;

  constructor(private store: Store<fromApp.AppState>, public dialog: MatDialog,) { }


  ngOnInit(): void {
    this.categorySubscription = this.store.select('categories').subscribe(state => this.categories = state.categoriesList);
    this.authSubscription = this.store.select('auth').subscribe(state => this.user = state.user);
  }

  onCreatePost() {
    this.isCreatePost = true;
  }

  onPostCreated(data: CreatePostData) {
    this.isCreatePost = false;
    if (data != null) {
      const postData = new FormData();
      postData.append('tags', JSON.stringify(data.tags));
      postData.append('title', data.title);
      postData.append('content', data.content);
      //  postData.append('image', data.image, data.title);
      postData.append('authorId', 'user');
      for (let i = 0; i < data.images.length; i++) {
        postData.append('images[]', data.images[i], data.title + i);
      }

      this.store.dispatch(new PostsActions.AddPostStart(postData))
    }
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

}
