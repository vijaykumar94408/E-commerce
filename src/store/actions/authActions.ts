// src/store/actions/authActions.ts
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: { email: string; password: string };
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { token: string; user: { id: number; username: string; email: string } };
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});

export type AuthActionTypes = LoginRequestAction | LoginSuccessAction | LoginFailureAction | LogoutAction;

export const loginRequest = (credentials: { email: string; password: string }): LoginRequestAction => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (
  userData: { token: string; user: { id: number; username: string; email: string } }
): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error: string): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: error,
});
