import { Action } from "@ngrx/store";

export enum CartActionTypes {
  SET_CART = "SET_CART",
}

export class SetCart implements Action {
  readonly type = CartActionTypes.SET_CART;

  constructor(public cart) {}
}

export type CartActionsUnion = SetCart;
