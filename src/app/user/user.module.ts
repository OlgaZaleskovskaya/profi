import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../material/angular-material.module';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './createPost/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



const routes: Routes = [
  {
    path: '',
    component: UserComponent
  }
];



@NgModule({
  declarations: [
    UserComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule.forChild(routes),
    SharedModule
  ],

 // entryComponents: [EmailComponent]s
})
export class UserModule { }
