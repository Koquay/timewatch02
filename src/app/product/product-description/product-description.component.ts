import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { CartService } from "src/app/cart/cart.service";

@Component({
  selector: "app-product-description",
  templateUrl: "./product-description.component.html",
  styleUrls: ["./product-description.component.scss"],
})
export class ProductDescriptionComponent implements OnInit {
  private product;
  private quantity = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  private addToCart = () => {
    console.log("quantity", this.quantity);
    const payload = { quantity: this.quantity, productId: this.product._id };
    this.cartService.addToCart(payload).subscribe();
  };

  private getProduct = () => {
    const productSelector = (state) => {
      return state.product.product;
    };

    const product$ = this.store.select(productSelector);

    product$.subscribe((product) => {
      this.product = product;
      console.log("product", this.product);
    });
  };
}
