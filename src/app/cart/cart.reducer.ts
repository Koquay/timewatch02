import { CartActionsUnion, CartActionTypes } from "./cart.actions";

export const CartReducer = (state = initialState, action: CartActionsUnion) => {
  switch (action.type) {
    case CartActionTypes.SET_CART:
      const subtotal = computeSubtotal(action.cart);
      setLocalStorageCart(action.cart, subtotal);
      return {
        ...state,
        cart: action.cart,
        subtotal: subtotal,
        numberOfItems: action.cart.products.length,
      };

    case CartActionTypes.REMOVE_CART:
      removeCartFromLocalStorage();
      return {
        ...state,
        cart: {},
      };

    default:
      return state;
  }
};

const removeCartFromLocalStorage = () => {
  let localStorageData = JSON.parse(localStorage.getItem("timewatch02"));

  localStorageData.cart = {};
  localStorageData.cartSubtotal = 0;
  localStorageData.cartNumberOfItems = 0;

  localStorage.setItem("timewatch02", JSON.stringify(localStorageData));
};

const computeSubtotal = (cart) => {
  let subtotal = cart.products.reduce((acc, item) => {
    return (acc += item.product.price * item.quantity);
  }, 0);
  console.log("subtotal", subtotal);
  return subtotal;
};

const setLocalStorageCart = (cart, subtotal) => {
  let localStorageData = JSON.parse(localStorage.getItem("timewatch02"));
  if (!localStorageData) {
    localStorageData = JSON.parse(JSON.stringify(localStorageDataTmp));
  }
  localStorageData.cart = cart;
  localStorageData.cartSubtotal = subtotal;
  localStorageData.cartNumberOfItems = cart.products.length;

  localStorage.setItem("timewatch02", JSON.stringify(localStorageData));
};

const initialState = {
  cart: {},
  subtotal: 0,
  numberOfItems: 0,
};

const localStorageDataTmp = {
  products: [],
  selectedProduct: {},
  productsByCategory: {},
  relatedProducts: [],
  productCount: 0,
  cart: {},
  subtotal: 0,
  numberOfItems: 0,
};
