import { CartActionsUnion, CartActionTypes } from "./cart.actions";

export const CartReducer = (state = initialState, action: CartActionsUnion) => {
  console.log("action.cart", action.cart);
  switch (action.type) {
    case CartActionTypes.SET_CART:
      return {
        ...state,
        cart: action.cart,
      };

    default:
      return state;
  }
};

const initialState = {
  cart: {},
};
