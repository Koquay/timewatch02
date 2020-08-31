import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { StoreCheckoutData } from "./checkout.actions";
import {
  SetError,
  SetInfo,
} from "../shared/components/message/message.actions";
import { CheckoutService } from "./checkout.service";
import { SetActiveNav } from "../shared/components/header/header.actions";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  private checkoutData;
  private expMonths;
  private expYears;
  private citiesStates;
  private cart;
  private loading = false;

  constructor(
    private store: Store<any>,
    private checkoutServce: CheckoutService
  ) {}

  ngOnInit() {
    this.getCheckoutData();
    this.getCart();
    this.setActiveNav("checkoutActive");
  }

  private setActiveNav = (nav) => {
    this.store.dispatch(new SetActiveNav(nav));
  };

  private getCheckoutData = () => {
    const checkoutSelector = (state) => {
      return state.checkout;
    };

    const checkout$ = this.store.select(checkoutSelector);

    checkout$.subscribe((checkout) => {
      if (!checkout.checkoutData.firstName) {
        const localStorageData = JSON.parse(
          localStorage.getItem("timewatch02")
        );

        this.checkoutData = localStorageData.checkoutData;

        if (!this.checkoutData) {
          this.checkoutData = JSON.parse(JSON.stringify(checkout.checkoutData));
        }
      } else {
        this.checkoutData = JSON.parse(JSON.stringify(checkout.checkoutData));
      }

      this.citiesStates = checkout.citiesStates;
      this.expMonths = checkout.expMonths;
      this.expYears = checkout.expYears;
    });
  };

  private getCart = () => {
    const cartSelector = (state) => {
      return state.cart;
    };
    const cart$ = this.store.select(cartSelector);

    cart$.subscribe((cart) => {
      if (!cart._id) {
        const localStorageData = JSON.parse(
          localStorage.getItem("timewatch02")
        );

        this.cart = localStorageData.cart;
      } else {
        this.cart = cart;
      }

      if (!this.cart._id) {
        this.store.dispatch(
          new SetInfo("Your cart is empty. Please enter items to proceed.")
        );
        return;
      }

      if (!this.cart.products.length) {
        this.store.dispatch(
          new SetInfo("Your cart is empty. Please enter items to proceed.")
        );
        return;
      }
    });
  };

  private placeOrder = () => {
    if (!this.cart._id) {
      this.store.dispatch(
        new SetError("Your cart is empty. Please enter items to proceed.")
      );
      return;
    }

    if (!this.cart.products.length) {
      this.store.dispatch(
        new SetError("Your cart is empty. Please enter items to proceed.")
      );
      return;
    }

    this.checkoutServce
      .placeOrder(this.checkoutData, this.setLoading)
      .subscribe();
  };

  private saveCheckoutDataToStore = () => {
    this.store.dispatch(new StoreCheckoutData(this.checkoutData));
  };

  public setLoading = (value) => {
    this.loading = value;
  };
}
