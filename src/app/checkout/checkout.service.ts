import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import {
  SetError,
  SetInfo,
} from "../shared/components/message/message.actions";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class CheckoutService {
  private url = "/api/order";

  constructor(private httpClient: HttpClient, private store: Store<any>) {}

  public placeOrder = (orderData, setLoading) => {
    console.table(orderData);
    const params = { orderData };

    setLoading(true);
    return this.httpClient.post<{ message; order }>(this.url, params).pipe(
      tap((newOrder) => {
        this.store.dispatch(new SetInfo(newOrder.message));
        setLoading(false);
      }),
      catchError((error) => {
        this.store.dispatch(new SetError(error.error));
        setLoading(false);
        throw error;
      })
    );
  };
}
