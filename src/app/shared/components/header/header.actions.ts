import { Action } from "@ngrx/store";

export enum HeaderActionTypes {
  SET_ACTIVE_NAV = "SET_ACTIVE_NAV",
}

export class SetActiveNav implements Action {
  readonly type = HeaderActionTypes.SET_ACTIVE_NAV;

  constructor(public activeNav) {}
}

export type HeaderActionsUnion = SetActiveNav;
