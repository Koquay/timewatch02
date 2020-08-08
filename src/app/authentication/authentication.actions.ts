import { Action } from "@ngrx/store";

export enum LoginActionTypes {
  SET_LOGGED_IN = "SET_LOGGED_IN",
}

export class SetLoggedIn implements Action {
  readonly type = LoginActionTypes.SET_LOGGED_IN;

  constructor(public loggedIn) {}
}

export type AuthenticationActionUnion = SetLoggedIn;
