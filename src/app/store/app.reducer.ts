import { ActionReducerMap } from '@ngrx/store';
//import * as fromPosts from '../postList/store/post-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromCategories from '../categories/store/categories.reducer';
import * as fromPosts from '../posts/store/posts.reducer';

export interface AppState {
  //posts: fromPosts.State;
  auth: fromAuth.State,
  categories: fromCategories.State,
  posts: fromPosts.State
}

export const appReducer: ActionReducerMap<AppState> = {
  //posts: fromPosts.postListReducer,
  auth: fromAuth.authReducer,
  categories: fromCategories.categoriesReducer,
  posts: fromPosts.postsReducer
};
