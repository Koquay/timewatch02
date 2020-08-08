import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-product-related",
  templateUrl: "./product-related.component.html",
  styleUrls: ["./product-related.component.scss"],
})
export class ProductRelatedComponent implements OnInit {
  constructor(private store: Store<any>) {}
  private relatedProducts;

  ngOnInit() {
    this.getRelatedProduct();
  }

  private getRelatedProduct = () => {
    const productSelector = (state) => {
      return state.product.relatedProducts;
    };

    const relatedProduct$ = this.store.select(productSelector);

    relatedProduct$.subscribe((relatedProducts) => {
      this.relatedProducts = relatedProducts;
      console.log("relatedProducts", this.relatedProducts);
    });
  };
}
