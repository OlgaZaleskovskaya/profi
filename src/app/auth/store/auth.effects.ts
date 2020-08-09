import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, catchError, map, mergeMap, filter, tap } from 'rxjs/operators';
import { from, of, Observable, zip } from 'rxjs';

import * as AuthActions from './auth.actions'
import { LoginResponseData, SignupResponseData, FetchedUser } from '../auth.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface SignupResponse {
  message: string;
  user: {
    _id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    date: Date
  }
}

const handleSignUpError = (errorRes: any) => {
  const error = errorRes.error['message'];

  let errorMessage = 'An unknown error occurred!';
  /*  if (!errorRes.error) {
     console.log('!errorRes.error || !errorRes.error.error');
     return of(new AuthActions.LoginFailed(errorMessage));
   } */

  if (error.includes("expected `email` to be unique")) {
    errorMessage = 'This email exists already';
  }
  switch (error) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.LoginFailed(errorMessage));
};

const handleAuthenticate = (resData: SignupResponse) => {

  return new AuthActions.Login(null);
};
const MY_URL = 'http://localhost:3000/api/';
@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
    private http: HttpClient,
    private router: Router) { }

  @Effect()
  startLogin$ = this.actions$
    .pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http.post<LoginResponseData>((MY_URL + 'user/login'), {
          email: authData.payload.email,
          password: authData.payload.password
        }).pipe(
          map(
            resData => {
              const user = new FetchedUser (resData.id, resData.name, resData.email, resData.role,resData.token, resData.date)
             // const user = new FetchedUser(resData.id, resData.name, resData.email, resData.role, resData.token)
              return new AuthActions.Login({
                message: resData.message,
                user: user
              })
            }
          ),
          catchError(errorRes => {
            console.log('error', errorRes)
            return handleSignUpError(errorRes)
          }
          ))
      }
      )
    );


  @Effect({ dispatch: false })
  loginSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(["/"])
    })
  );


  @Effect({ dispatch: false })
  logput = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(["/"])
    })
  );

  @Effect()
  signupStart$ = this.actions$
    .pipe(
      ofType(AuthActions.SIGN_UP_START),
      switchMap((userData: AuthActions.SignUpStart) => {
        return this.http.post<SignupResponseData>((MY_URL + 'user/signup'), userData.payload)
          .pipe(
            map(resData => {
              return new AuthActions.SignUp(
                {
                  message: resData.message,
                  user: resData.user,
               }
              )
            }),
            catchError(errorRes => {
              const error = errorRes.error.error.message;
              return handleSignUpError(errorRes);
            })
          )
      }
      )
    );

}
