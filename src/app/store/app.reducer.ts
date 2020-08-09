import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromCategories from '../categories/store/categories.reducer';
import * as fromPosts from '../posts/store/posts.reducer';

export interface AppState {
  auth: fromAuth.State,
  categories: fromCategories.State,
  posts: fromPosts.State
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  categories: fromCategories.categoriesReducer,
  posts: fromPosts.postsReducer
};
