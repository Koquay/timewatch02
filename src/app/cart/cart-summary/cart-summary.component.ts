import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-cart-summary",
  templateUrl: "./cart-summary.component.html",
  styleUrls: ["./cart-summary.component.scss"],
})
export class CartSummaryComponent implements OnInit {
  private cart;
  private taxes;
  private subtotal;
  private total;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.getCart();
    this.computePriceSummary();
  }

  private getCart = () => {
    const cartSelector = (state) => {
      return state.cart.cart;
    };

    const cart$ = this.store.select(cartSelector);

    cart$.subscribe((cart) => {
      if (!cart._id) {
        cart = JSON.parse(localStorage.getItem("timewatch02")).cart;
      }

      this.cart = JSON.parse(JSON.stringify(cart));
      this.computePriceSummary();
    });
  };

  private computePriceSummary = () => {
    this.computeSubtotal();
    this.computeTaxes();
    this.computeTotal();
  };

  private computeTaxes = () => {
    this.taxes = 0.05 * this.subtotal;
  };

  private computeTotal = () => {
    this.total = this.taxes + this.subtotal;
  };

  private computeSubtotal = () => {
    this.subtotal = this.cart.products.reduce((acc, item) => {
      return (acc += item.product.price * item.quantity);
    }, 0);
  };
}
