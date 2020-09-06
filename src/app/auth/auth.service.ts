import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import {  NewUser } from './auth.model';
import { Subscription } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {
  email: string;
  role: string;
  password: string;
  userName: string;
  authSubscription: Subscription;
  isAuthenticated: boolean;
  isLoading: boolean;
  onLoginError: string;
  constructor(private store: Store<fromApp.AppState>,
    private componentFactoryResolver: ComponentFactoryResolver) {

    this.authSubscription = this.store.select('auth').subscribe(res => {
      if (res.user != null) {
        this.isAuthenticated = res.isAuthenticated;
        this.userName = res.user.name;
        this.role = res.user.role;
      }
      this.isLoading = res.isLoading;
      if (res.authError) {
        this.showErrorAlert(res.authError)
      }
    })

  }

  onLogin(email: string, password: string) {
    this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }));
  }

  onSignup(name: string, email: string, password: string, role: string) {
    const user = new NewUser(name, email, password, role);
    this.store.dispatch(new AuthActions.SignUpStart({ user: user }));
  }

  showErrorAlert(error: string) { 
    //ToDo
  }



}
