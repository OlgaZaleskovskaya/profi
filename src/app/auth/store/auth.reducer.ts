import {FetchedUser } from '../auth.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: FetchedUser;
  isAuthenticated: boolean;
  authError: string,
  isLoading: boolean,
  authMessage: string
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
  authError: null,
  isLoading: false,
  authMessage: null
}


export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {

    case AuthActions.LOGIN:
      return {
        ...state,
        authMessage: action.payload.message,
        isAuthenticated: true,
        user: action.payload.user,
        authError: null,
        isLoading: false
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        authMessage: null,
        authError: null
      };

    case AuthActions.SIGN_UP_START:
      return {
        ...state,
        isLoading: true
      };
    case AuthActions.SIGN_UP:
      return {
        ...state,
        isLoading: false,
        authMessage: `${action.payload.user}, ${action.payload.message}`
      };

    case AuthActions.LOGIN_START:
      return {
        ...state,
        isAuthenticated: false,
        authError: null,
        user: null,
        isLoading: true
      };

    case AuthActions.LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        authError: action.payload,
        user: null,
        isLoading: false
      };

    case AuthActions.REMOVE_MESSAGE:

        return {
          ...state,
          authError: null,
          authMessage: null
        };


    default:
      return {
        ...
        state
      };

  }

}
