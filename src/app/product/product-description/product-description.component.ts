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
  private loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  private addToCart = () => {
    const payload = { quantity: this.quantity, productId: this.product._id };
    this.cartService.addToCart(payload, this.setLoading).subscribe();
  };

  private getProduct = () => {
    const productSelector = (state) => {
      return state.product.product;
    };

    const product$ = this.store.select(productSelector);

    product$.subscribe((product) => {
      this.product = product;
    });
  };

  public setLoading = (value) => {
    this.loading = value;
  };
}
