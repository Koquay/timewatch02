import { ActionReducerMap } from "@ngrx/store";
import { HomeReducer } from "src/app/home/home.reducer";
import { ProductReducer } from "src/app/product/product.reducer";
import { CartReducer } from "src/app/cart/cart.reducer";
import { CheckoutReducer } from "src/app/checkout/checkout.reducer";
import { MessageReducer } from "src/app/shared/components/message/message.reducer";
import { HeaderReducer } from "src/app/shared/components/header/header.reducer";
import { AuthenticationReducer } from "src/app/authentication/authentication.reducer";

export interface State {}

export const reducers: ActionReducerMap<State> = {
  home: HomeReducer,
  product: ProductReducer,
  cart: CartReducer,
  checkout: CheckoutReducer,
  message: MessageReducer,
  header: HeaderReducer,
  authentication: AuthenticationReducer,
};
