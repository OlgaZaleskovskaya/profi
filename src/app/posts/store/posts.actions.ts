import { Action } from '@ngrx/store';
import {   Comment, Post } from '../post.model';

export const GET_POSTS = '[Post] Get Posts';
export const SET_POSTS = '[Post] Set Posts';
export const GET_POSTS_ERROR = '[Post] Get Posts Error';
export const GET_COMMENTS_START = '[Post] Get Comments Start';
export const GET_COMMENTS_SUCCESS = '[Post] Get Comments Success';
export const GET_COMMENTS_END = '[Post] Get Comments End';
export const ADD_COMMENT_START = '[Post] Add Comment Start';
export const ADD_COMMENT_SUCCESS = '[Post] Add Comment Success';
export const ADD_POST_START = '[Post] Add Post Start';
export const ADD_POST_SUCCESS = '[Post] Add Post Success';


export class GetPosts implements Action {
  readonly type = GET_POSTS;
 constructor(public payload: {postsPerPage: number, currentPage: number, currentTag: string }) { };
}

export class SetPosts implements Action {
  readonly type = SET_POSTS;
  constructor(public payload: {posts: Post[], maxPosts:number}) { };
}

export class GetPostsError implements Action {
  readonly type = GET_POSTS_ERROR;
  constructor(public payload: {error: string}) { };
}

export class AddCommentsStart implements Action {
  readonly type = ADD_COMMENT_START;
  constructor(public payload: string) { };
}


export class GetCommentsSuccess implements Action {
  readonly type = GET_COMMENTS_SUCCESS;
constructor(public payload: Comment[]) { };
}
export class GetCommentsEnd implements Action {
  readonly type = GET_COMMENTS_END;
  constructor(public payload: Post) { };
}

export class AddCommentStart implements Action {
  readonly type = ADD_COMMENT_START;
  constructor(public payload: {postId: string, authorId: string, content: string}) { };
}

export class AddCommentSuccess implements Action {
  readonly type = ADD_COMMENT_SUCCESS;
  constructor(public payload: {comment: Comment, commentsAmount: number}) { };
}

export class AddPostStart implements Action {
  readonly type = ADD_POST_START;
  constructor(public payload: FormData) { };
}

export class AddPostSuccess implements Action {
  readonly type = ADD_POST_SUCCESS;
  constructor(public payload: {message: string, post: Post}) { };
}

export type postsActions = SetPosts
  | GetPosts
  | GetPostsError
  | AddCommentStart
  | AddCommentSuccess
  | GetCommentsEnd
  | GetCommentsSuccess
  | AddPostStart
  | AddPostSuccess;

