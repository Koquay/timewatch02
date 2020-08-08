import { Injectable } from "@angular/core";
import { LoginModel } from "./login.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import cookie from "js-cookie";
import { Store } from "@ngrx/store";
import { SetCart } from "src/app/cart/cart.actions";
import { SetLoggedIn } from "../authentication.actions";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private baseUrl = "/api/authentication";

  constructor(private httpClient: HttpClient, private store: Store<any>) {}

  public login = (loginData: LoginModel) => {
    console.log("loginData", loginData);
    return this.httpClient
      .post<{ token; cart }>(`${this.baseUrl}`, loginData)
      .pipe(
        tap((userData) => {
          console.log("userData", userData);
          cookie.set("token", userData.token);
          this.store.dispatch(new SetCart(userData.cart));
          this.store.dispatch(new SetLoggedIn(true));
        })
      );
  };
}
