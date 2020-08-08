import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private baseUrl = "/api/cart/";
  constructor(private httpClient: HttpClient) {}

  public addToCart = (payload) => {
    console.log("payload", payload);

    return this.httpClient.put(`${this.baseUrl}/2`, payload).pipe(
      tap((cart) => {
        console.log("cart", cart);
      })
    );
  };
}
