import { Injectable } from "@angular/core";
import { LoginModel } from "./login.model";
import { HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import cookie from "js-cookie";
import { Store } from "@ngrx/store";
import { SetCart } from "src/app/cart/cart.actions";
import { SetLoggedIn } from "../authentication.actions";
import { Router } from "@angular/router";
import {
  SetError,
  SetInfo,
} from "src/app/shared/components/message/message.actions";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private baseUrl = "/api/authentication";

  constructor(
    private httpClient: HttpClient,
    private store: Store<any>,
    private router: Router
  ) {}

  public login = (loginData: LoginModel, setLoading) => {
    setLoading(true);
    return this.httpClient
      .post<{ token; cart }>(`${this.baseUrl}`, loginData)
      .pipe(
        tap((userData) => {
          cookie.set("token", userData.token);
          this.store.dispatch(new SetCart(userData.cart));
          this.store.dispatch(new SetLoggedIn(true));
          this.store.dispatch(new SetInfo("Login successful."));
          setLoading(false);
          this.router.navigate(["/home"]);
        }),
        catchError((error) => {
          this.store.dispatch(new SetError(error.error));
          setLoading(false);
          throw error;
        })
      );
  };
}
