import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as PostsActions from './../store/posts.actions';
import {  Comment } from '../post.model';
import { tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;
  @Output() onCommentCreated = new EventEmitter< string>();
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        //  validators: [Validators.required],
        // asyncValidators: [mimeType]
      })
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader;
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddComment() {
    console.log('comment created. create comment component', this.form.value.content);
    if(this.form.invalid){
      return;
    }
    const comment = {
      postId: "",
      comment: this.form.value.content
    }
    this.onCommentCreated.emit(this.form.value.content)

  }

  onCancel() {

  }


}



