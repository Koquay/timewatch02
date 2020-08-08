import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { SetSelectedProduct } from "../product.actions";

@Component({
  selector: "app-product-display",
  templateUrl: "./product-display.component.html",
  styleUrls: ["./product-display.component.scss"],
})
export class ProductDisplayComponent implements OnInit {
  private product;
  private relatedProducts;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.getProduct();
  }

  private getProduct = () => {
    const productSelector = (state) => {
      return state.product;
    };

    let productStore$ = this.store.select(productSelector);

    productStore$.subscribe((productStore) => {
      this.product = productStore.product;
      this.relatedProducts = productStore.relatedProducts;
    });
  };

  private getSelectedProduct = (productId) => {
    this.store.dispatch(new SetSelectedProduct(productId));
  };
}
