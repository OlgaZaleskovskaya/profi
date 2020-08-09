import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component';




const routes: Routes = [
  {
    path: '',
    component: AuthComponent, children: [{
      path: 'signup',
      component: SignupComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
