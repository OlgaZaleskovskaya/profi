import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { AuthGuard } from './auth/auth.guard';



const routes: Routes = [


  { path: 'posts', component: PostsComponent },
  { path: '', redirectTo: "/posts", pathMatch: "full" },
  {
    path: 'personal',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
