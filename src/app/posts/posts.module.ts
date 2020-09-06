import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../material/angular-material.module';
import { PostsComponent } from './posts.component';
import { CommentsComponent } from './comments/comments.component';
import { CreateCommentComponent } from './createComment/create-comment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImagesComponent } from './images/images.component';
import { PostComponent } from './post/post.component';







@NgModule({
  declarations: [
   PostsComponent,
   CommentsComponent,
   CreateCommentComponent,
   ImagesComponent,
   PostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],

})
export class PostsModule { }
