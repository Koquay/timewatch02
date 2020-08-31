import { Injectable } from "@angular/core";
import cookie from "js-cookie";
import { Store } from "@ngrx/store";
import { SetLoggedOut } from "../authentication.actions";
import { Router } from "@angular/router";
import { RemoveCart } from "src/app/cart/cart.actions";

@Injectable({
  providedIn: "root",
})
export class LogoutService {
  constructor(private store: Store<any>, private router: Router) {}

  public logout = () => {
    console.log("log out");
    cookie.remove("token");

    this.store.dispatch(new SetLoggedOut());
    this.store.dispatch(new RemoveCart());
    this.router.navigate(["/"]);
  };
}
