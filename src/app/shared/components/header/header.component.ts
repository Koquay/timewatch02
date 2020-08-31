import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { LogoutService } from "src/app/authentication/logout/logout.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  private cartNumberOfItems;
  private cartSubtotal;

  constructor(
    private store: Store<any>,
    private logoutService: LogoutService
  ) {}

  ngOnInit() {
    this.getCartTally();
    console.log("fasdjfdajdfjasjdajkadfkjdasfl;kdfsa;dsfdsa;");
  }

  private getCartTally = () => {
    const cartSelector = (state) => {
      return state.cart;
    };

    const cart$ = this.store.select(cartSelector);

    cart$.subscribe((cart) => {
      if (!cart._id) {
        const localStorageData = JSON.parse(
          localStorage.getItem("timewatch02")
        );
        this.cartSubtotal = localStorageData.cartSubtotal;
        this.cartNumberOfItems = localStorageData.cartNumberOfItems;
      } else {
        this.cartSubtotal = cart.cartSubtotal;
        this.cartNumberOfItems = cart.cartNumberOfItems;
      }
    });
  };

  private logout = () => {
    console.log("log out called");
    this.logoutService.logout();
  };
}
