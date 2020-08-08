import { ActionReducerMap } from "@ngrx/store";
import { HomeReducer } from "src/app/home/home.reducer";
import { ProductReducer } from "src/app/product/product.reducer";
import { CartReducer } from "src/app/cart/cart.reducer";

export interface State {}

export const reducers: ActionReducerMap<State> = {
  home: HomeReducer,
  product: ProductReducer,
  cart: CartReducer,
};
