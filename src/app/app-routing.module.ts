import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from './shared/shared.module';


const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: '', redirectTo: "/posts", pathMatch: "full" },
  {
    path: 'personal',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
