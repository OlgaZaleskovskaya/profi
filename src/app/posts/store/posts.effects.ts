import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { switchMap, catchError, map, tap } from 'rxjs/operators';


import * as PostsActions from './posts.actions'
import { Comment, Post } from '../post.model';
import { of } from 'rxjs';




const MY_URL = 'http://localhost:3000/api/';
@Injectable()
export class PostsEffects {

  constructor(private actions$: Actions, private http: HttpClient) { }
  @Effect()
  getPosts$ = this.actions$
    .pipe(
      ofType(PostsActions.GET_POSTS),
      switchMap(res => {

        const queryParams = `?pagesize=
        ${res['payload']['postsPerPage']}
        &page=${res['payload']['currentPage']}
        &tag=${res['payload']['currentTag']}`;
        return this.http.get<{ message: string, posts: any[], maxPosts: number }>(MY_URL + 'posts' + queryParams)
          .pipe(
            map(res => {
              console.log('post', res);
              const transformedPosts = res.posts.map(post => {
                const transformedComments = post.comments.map(comment => { return { authorId: comment.authorId, date: comment.date, content: comment.content, id: comment._id } });
                const smth = new Post(post._id,
                  post.title,
                  post.content,
                  post.date, post.authorId,
                  post.tags, post.imageData,
                  transformedComments);
                return smth;
              });
              return (new PostsActions.SetPosts({ posts: transformedPosts, maxPosts: res.maxPosts }));
            }), catchError(error => {
              let errorMessage = "An unknown error occured!";
              return of(new PostsActions.GetPostsError({ error: errorMessage }))
            }
            )
          )
      }
      ))
    ;

  private getImageSize(path: string[]): { path: string, width: number, height: number, orient: string }[] {
    const newData = path.map(imgPath => {
      let img = new Image();
      img.src = imgPath;
      console.log('width', img.width)
      setTimeout(function () { console.log('width set timeout', img.width) }, 3000);
      return { path: imgPath, width: img.width, height: img.height, orient: ((img.width / img.height) > 1 ? "h" : "v") }
    });
    console.log('newData effects', newData);
    return newData;
  }


  @Effect()
  addCommentStart$ = this.actions$
    .pipe(
      ofType(PostsActions.ADD_COMMENT_START),
      switchMap((commentData: PostsActions.AddCommentStart) => {
        const newComment = { authorId: commentData.payload.authorId, content: commentData.payload.content };
        return this.http.patch<any>(MY_URL + "posts/" + commentData.payload.postId, newComment)
          .pipe(
            map(commentData => {
              const newComment = new Comment(
                commentData.comment._id,
                commentData.comment.content,
                commentData.comment.date,
                commentData.comment.authorId);
              return (new PostsActions.AddCommentSuccess({ comment: newComment, commentsAmount: commentData.totalComments }));
            }),
            catchError(error => {
              let errorMessage = "An unknown error occured!";
              return of()
            })
          );
      }
        //
      )
    );

  @Effect()
  addPostStart$ = this.actions$
    .pipe(
      ofType(PostsActions.ADD_POST_START),
      switchMap((postData: PostsActions.AddPostStart) => {

        return this.http.post<{ message: string, post: Post }>((MY_URL + 'posts'), postData.payload)
          .pipe(tap(res => console.log('on http', res)),
            map(response => {
              return (new PostsActions.AddPostSuccess(response));
            }),
            catchError(error => {
              let errorMessage = "An unknown error occured!";
              return of(new PostsActions.SetPosts(null))
            })
          )
      }

      )
    );


}
