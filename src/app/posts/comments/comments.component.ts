import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as PostsActions from './../store/posts.actions';
import { Post, Comment } from '../post.model';
import { tap } from 'rxjs/operators';



@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean;
  @Input() commentList: Comment[];
  constructor(private store: Store<fromApp.AppState>) { }
  start: number;
  end: number;


  ngOnInit(): void {
    this.start = 0;
    this.end = 3;
    console.log('commentList', this.commentList);
  };

  onReadComments(id: string) {

  }

  onMoreComments() {

    this.end += 3;
  }

  ngOnDestroy(): void {

  }
}
