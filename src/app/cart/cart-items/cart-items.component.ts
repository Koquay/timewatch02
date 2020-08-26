import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { CartService } from "../cart.service";

@Component({
  selector: "app-cart-items",
  templateUrl: "./cart-items.component.html",
  styleUrls: ["./cart-items.component.scss"],
})
export class CartItemsComponent implements OnInit {
  private cart;
  private quantity;
  private loading = false;

  constructor(private store: Store<any>, private cartService: CartService) {}

  ngOnInit() {
    this.getCart();
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
    });
  };

  private updateCartItem = (item) => {
    const payload = { productId: item.product._id, quantity: item.quantity };

    this.cartService.updateCartItem(payload, this.setLoading).subscribe();
  };

  private deleteCartItem = (productId) => {
    this.cartService.deleteCartItem(productId, this.setLoading).subscribe();
  };

  public setLoading = (value) => {
    this.loading = value;
  };
}
