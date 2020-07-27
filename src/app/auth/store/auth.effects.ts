import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, catchError, map, mergeMap, filter, tap } from 'rxjs/operators';
import { from, of, Observable, zip } from 'rxjs';

import * as AuthActions from './auth.actions'
import { User, Role } from '../auth.model';

const users = [
  { id: "1", name: "Nick", email: "nick@mail.com", password: "123", role: 'master' },
  { id: "2", name: "Max", email: "max@mail.com", password: "1234", role: 'master' },
  { id: "3", name: "Olga", email: "olga@mail.com", password: "12345", role: 'user' },
  { id: "4", name: "Nina", email: "nina@mail.com", password: "12", role: 'user' },

]



@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions) { }

  @Effect()
  startLogin$ = this.actions$
    .pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap(res => of(users)
        .pipe(
          map(res => {
           const user =  { id: "1", name: "Nick", email: "nick@mail.com", password: "123" } as User;
           user.role = Role.Master;
            return (new AuthActions.Login({user: user}));
          }),
          catchError(error => {
            let errorMessage = "An unknown error occured!";
            return of(new AuthActions.LoginFailed(errorMessage))
          })
        )
      )
    );

    @Effect()
    startSignup$ = this.actions$
      .pipe(
        ofType(AuthActions.SIGN_UP_START),
        switchMap(res => of(users)
          .pipe(
            map(res => {
             const user =  { id: "1", name: "Nick", email: "nick@mail.com", password: "123" } as User;
             user.role = Role.Master;
              return (new AuthActions.Login({user: user}));
            }),
            catchError(error => {
              let errorMessage = "An unknown error occured!";
              return of(new AuthActions.LoginFailed(errorMessage))
            })
          )
        )
      );

}
