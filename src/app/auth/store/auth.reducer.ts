import { User } from '../auth.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  isAuthenticated: boolean;
  authError: string,
  isLoading: boolean
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
  authError: null,
  isLoading: false
}


export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {

    case AuthActions.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        authError: null,
        isLoading: false
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    case AuthActions.SIGN_UP_START:
      return {
        ...state,
        isLoading: true
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
    default:
      return {
        ...
        state
      };

  }

}
