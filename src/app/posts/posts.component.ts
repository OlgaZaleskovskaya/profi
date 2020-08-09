import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as PostsActions from './store/posts.actions';
import { Post } from './post.model';
import { Category } from '../categories/category.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 }))
      ])
    ]),]
})
export class PostsComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  isAuthenticated: boolean;
  userId: string;
  userName: string;
  userRole: string;

  postsSubscription: Subscription;
  postList: Post[];
  fullList: Object[];
  totalPosts = 1;
  postsPerPage = 1;
  pageSizeOptions = [1, 2, 3, 5, 10];
  currentPage = 1;


  categoriesSubscription: Subscription;
  categories: Category[] = [];
  currentTag: string;

  isComments: boolean;
  isCreateComment: boolean;
  isLoading: boolean;
  currentPostId: string;
  // error: string;
  isreadComments: boolean;
  constructor(private store: Store<fromApp.AppState>) { }


  ngOnInit(): void {

    this.fullList = [];
    this.isLoading = true;
    this.isAuthenticated = false;
    this.isComments = false;
    this.isCreateComment = false;
    this.categoriesSubscription = this.store.select('categories')
      .subscribe((state) => {
        this.categories = state.categoriesList;
        this.currentTag = state.currentTag;
      });

    this.store.dispatch(new PostsActions.GetPosts({ postsPerPage: this.postsPerPage, currentPage: this.currentPage, currentTag: this.currentTag }));
    this.postsSubscription = this.store.select('posts').subscribe(postState => {
      this.postList = [...postState.posts];

      this.totalPosts = postState.maxPosts;
      this.isLoading = false;
    }
    );

    this.authSubscription = this.store.select('auth')
      .subscribe(authState => {
        this.isAuthenticated = authState.isAuthenticated;
        if (this.isAuthenticated) {
//this.userName = authState.user.name;
       //   this.userRole = authState.user.role;
      //    this.userId = authState.user.id;
        }
      }
      );
  };

  /*  private getImageSize(post: Post): { path: string, width: number, height: number, orient: string }[] {
     const paths = [...post.imagePath];
     const newData = paths.map(imgData => {
       let img = new Image();
       img.src = imgData.path;
     //  console.log('get src', img.src);
 //console.log('get size width', img.width);\\ setTimeout(function () { console.log('get size width after interval', img.width); }, 3000);



       return { path: imgData.path, width: img.width, height: img.height, orient: ((img.width /img.height) > 1 ? "h" : "v") }
     });
   //  console.log('newData', newData);

     return newData;
   } */

  onGetComments() {
    this.isComments = !this.isComments;
  }

  onAddComment(post: Post) {
    this.isCreateComment = !this.isCreateComment;
    this.currentPostId = post.id;
  }

  setImageDivStyling() {

  }

  onCommentCreated(event) {
    const comment = {
      postId: this.currentPostId,
      authorId: "user",
      content: event
    }
    this.store.dispatch(new PostsActions.AddCommentStart(comment));
    this.isCreateComment = false;
  }



  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe()
  }

  onPageChanged(pageData: PageEvent) {
    this.isLoading = true;
    this.postsPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.store.dispatch(new PostsActions.GetPosts({ postsPerPage: this.postsPerPage, currentPage: this.currentPage, currentTag: this.currentTag }));

  }
}
