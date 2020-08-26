import { Action } from "@ngrx/store";

export enum CheckoutActionTypes {
  STORE_CHECKOUT_DATA = "STORE_CHECKOUT_DATA",
}

export class StoreCheckoutData implements Action {
  readonly type = CheckoutActionTypes.STORE_CHECKOUT_DATA;

  constructor(public checkoutData) {}
}

export type CheckoutActionsUnion = StoreCheckoutData;
