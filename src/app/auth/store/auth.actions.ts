import { Action } from '@ngrx/store';
import { NewUser, User, FetchedUser } from '../auth.model';


export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_FAILED = '[Auth] Login Failed';
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const SIGN_UP_START = '[Auth] SignUp Start';
export const SIGN_UP = '[Auth] SignUp';
export const REMOVE_MESSAGE ='[Auth] RemoveMessage';



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
  constructor(public payload:  {message: string, user: FetchedUser}) { };
}

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;
  constructor(public payload: { user: NewUser }) { };
}

export class SignUp implements Action {
  readonly type = SIGN_UP;
  constructor(public payload: { message: string, user: string}) { };
}

export class Logout implements Action {
  readonly type = LOGOUT;

}

export class RemoveMessage implements Action {
  readonly type = REMOVE_MESSAGE;

}


export type AuthActions = LoginStart
  | LoginFailed
  | Login
  | Logout
  | SignUpStart
  | SignUp
  | RemoveMessage;

