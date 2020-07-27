import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { User } from './auth.model';


@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {
  email: string;
  role: string;
  password: string;
  name: string;
  newUser: User = new User('', '', '', '');

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

  }

  onLogin() {
    const user = { email: this.newUser.email, password: this.newUser.password }
    this.store.dispatch(new AuthActions.LoginStart(user));
  }

  onSignUp() {
    console.log('new user',  this.newUser )
    this.store.dispatch(new AuthActions.SignUpStart({user: this.newUser}));
  }

}
