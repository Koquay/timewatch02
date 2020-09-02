import { Action } from "@ngrx/store";

export enum LoginActionTypes {
  SET_LOGGED_IN = "SET_LOGGED_IN",
  SET_LOGGED_OUT = "SET_LOGGED_OUT",
  INIT_LOGGED_IN = "INIT_LOGGED_IN",
}

export class SetLoggedIn implements Action {
  readonly type = LoginActionTypes.SET_LOGGED_IN;

  constructor(public loggedIn) {}
}

export class SetLoggedOut implements Action {
  readonly type = LoginActionTypes.SET_LOGGED_OUT;
  constructor() {}
}

export class InitLoggedIn implements Action {
  readonly type = LoginActionTypes.INIT_LOGGED_IN;
  constructor() {}
}

export type AuthenticationActionUnion =
  | SetLoggedIn
  | SetLoggedOut
  | InitLoggedIn;
