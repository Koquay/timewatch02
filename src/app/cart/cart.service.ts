import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import cookie from "js-cookie";
import { Store } from "@ngrx/store";
import { SetCart } from "./cart.actions";
import {
  SetError,
  SetInfo,
} from "../shared/components/message/message.actions";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private baseUrl = "/api/cart/";
  constructor(private httpClient: HttpClient, private store: Store<any>) {}

  public addToCart = (payload, setLoading) => {
    setLoading(true);
    return this.httpClient.put(`${this.baseUrl}/2`, payload).pipe(
      tap((cart) => {
        this.setCart(cart);
        this.store.dispatch(
          new SetInfo("Item successfully added to your cart.")
        );
        setLoading(false);
      }),
      catchError((error) => {
        this.store.dispatch(new SetError(error.error));
        setLoading(false);
        throw error;
      })
    );
  };

  public updateCartItem = (payload, setLoading) => {
    setLoading(true);
    return this.httpClient.post(this.baseUrl, payload).pipe(
      tap((cart) => {
        this.setCart(cart);
        this.store.dispatch(
          new SetInfo("Item successfully updated in your cart.")
        );
        setLoading(false);
      }),
      catchError((error) => {
        this.store.dispatch(new SetError(error.error));
        setLoading(false);
        throw error;
      })
    );
  };

  public deleteCartItem = (productId, setLoading) => {
    const payload = {
      params: { productId },
    };

    setLoading(true);
    return this.httpClient.delete(this.baseUrl, payload).pipe(
      tap((cart) => {
        this.setCart(cart);
        this.store.dispatch(
          new SetInfo("Item successfully deleted from your cart.")
        );
        setLoading(false);
      }),
      catchError((error) => {
        this.store.dispatch(new SetError(error.error));
        setLoading(false);
        throw error;
      })
    );
  };

  private setCart = (cart) => {
    this.store.dispatch(new SetCart(cart));
  };
}
