import { Action } from '@ngrx/store';
import { User } from '../auth.model';


export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_FAILED = '[Auth] Login Failed';
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const SIGN_UP_START = '[Auth] SignUp Start';


export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string, password: string }) { };
}

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
  constructor(public payload: string) { };
}

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: { user: User }) { };
}

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;
  constructor(public payload: { user: User }) { };
}


export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload: { userId: string }) {
  }
}


export type AuthActions = LoginStart
  | LoginFailed
  | Login
  | Logout
  | SignUpStart;

