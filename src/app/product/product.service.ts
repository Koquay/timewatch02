import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { productFilters } from "./product.filters";
import { Store } from "@ngrx/store";
import {
  AddProductAction,
  AddProductsByCategoryAction,
} from "./product.actions";
import { SetError } from "../shared/components/message/message.actions";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private url = "/api/product";

  constructor(private httpClient: HttpClient, private store: Store<any>) {}

  public getProducts = (filters, setLoading) => {
    const productFilters = this.createProductFilters(filters);

    setLoading(true);
    return this.httpClient
      .get<{ products: []; productCount: number }>(
        `${this.url}${productFilters}`
      )
      .pipe(
        tap((productData) => {
          this.store.dispatch(new AddProductAction(productData));
          setLoading(false);
        }),
        catchError((error) => {
          this.store.dispatch(new SetError(error.error));
          setLoading(false);
          throw error;
        })
      );
  };

  public getProductsByCategory = (category, setLoading) => {
    const payload = JSON.stringify(category);
    const queryParams = `?category=${payload}`;

    setLoading(true);
    return this.httpClient.get(`${this.url}/2/${queryParams}`).pipe(
      tap((products) => {
        this.store.dispatch(new AddProductsByCategoryAction(products));
        setLoading(false);
      }),
      catchError((error) => {
        this.store.dispatch(new SetError(error.error));
        setLoading(false);
        throw error;
      })
    );
  };

  private createProductFilters = (filters) => {
    const {
      categories,
      brands,
      prices,
      colors,
      sizes,
      pageNo,
      pageSize,
      sortOptions,
    } = filters;

    let brandArray = this.createFilterArray(brands);
    let colorArray = this.createFilterArray(colors);
    let sizeArray = this.createFilterArray(sizes);
    let priceArray = this.createFilterArray(prices);
    let sortFilter = sortOptions.find((option) => option.checked == true);

    const productFilters = JSON.stringify({
      categories,
      brands: brandArray,
      colors: colorArray,
      sizes: sizeArray,
      prices: priceArray,
      pageNo,
      pageSize,
      sortFilter,
    });

    const queryParams = `?filters=${productFilters}`;
    return queryParams;
  };

  private createFilterArray = (item) => {
    let itemArray = [];
    let checkedItems = item.filter((filter) => filter.checked === true);

    for (let item of checkedItems) {
      if (item.priceIdentifier) {
        itemArray.push({ low: item.low, high: item.high });
      } else {
        itemArray.push(item.name);
      }
    }
    return itemArray;
  };
}
