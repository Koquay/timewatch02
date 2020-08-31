import { Action } from "@ngrx/store";

export enum CartActionTypes {
  SET_CART = "SET_CART",
  REMOVE_CART = "REMOVE_CART",
}

export class SetCart implements Action {
  readonly type = CartActionTypes.SET_CART;

  constructor(public cart) {}
}

export class RemoveCart implements Action {
  readonly type = CartActionTypes.REMOVE_CART;

  constructor() {}
}

export type CartActionsUnion = SetCart | RemoveCart;
