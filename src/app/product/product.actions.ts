import { Action } from "@ngrx/store";

export enum ProductActionTypes {
  ADD_PRODUCTS = "ADD_PRODUCTS",
  ADD_PRODUCTS_BY_CATEGORY = "ADD_PRODUCTS_BY_CATEGORY",
  GET_PRODUCTS = "GET_PRODUCTS",
  SET_SELECTED_PAGENO = "SET_SELECTED_PAGENO",
  SET_SORT_OPTION = "SET_SORT_OPTION",
  SET_COLOR = "SET_COLOR",
  SET_BRAND = "SET_BRAND",
  SET_PRICE_RANGE = "SET_PRICE_RANGE",
  SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT",
  SET_SELECTED_PRODUCT_FROM_LOCALSTORAGE = "SET_SELECTED_PRODUCT_FROM_LOCALSTORAGE",
}

export class AddProductAction implements Action {
  readonly type = ProductActionTypes.ADD_PRODUCTS;

  constructor(public productData) {}
}

export class AddProductsByCategoryAction implements Action {
  readonly type = ProductActionTypes.ADD_PRODUCTS_BY_CATEGORY;

  constructor(public products) {}
}

export class GetProductAction implements Action {
  readonly type = ProductActionTypes.GET_PRODUCTS;

  constructor() {}
}

export class SetSelectedPageNo implements Action {
  readonly type = ProductActionTypes.SET_SELECTED_PAGENO;

  constructor(public direction, public pageNo) {}
}

export class SetSortOption implements Action {
  readonly type = ProductActionTypes.SET_SORT_OPTION;

  constructor(public optionId) {}
}

export class SetColor implements Action {
  readonly type = ProductActionTypes.SET_COLOR;

  constructor(public color: {}) {}
}

export class SetBrand implements Action {
  readonly type = ProductActionTypes.SET_BRAND;

  constructor(public brand: {}) {}
}

export class SetPriceRange implements Action {
  readonly type = ProductActionTypes.SET_PRICE_RANGE;

  constructor(public priceRange: {}) {}
}

export class SetSelectedProduct implements Action {
  readonly type = ProductActionTypes.SET_SELECTED_PRODUCT;

  constructor(public productId) {}
}

export type ProductActionsUnion =
  | AddProductAction
  | AddProductsByCategoryAction
  | GetProductAction
  | SetSelectedPageNo
  | SetSortOption
  | SetColor
  | SetBrand
  | SetPriceRange
  | SetSelectedProduct;
