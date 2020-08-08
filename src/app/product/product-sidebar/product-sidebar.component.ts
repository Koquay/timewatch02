import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-product-sidebar",
  templateUrl: "./product-sidebar.component.html",
  styleUrls: ["./product-sidebar.component.scss"],
})
export class ProductSidebarComponent implements OnInit {
  private productStore;
  private latest;
  private bestseller;
  private special;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.getProductsByCategory();
  }

  private getProductsByCategory = () => {
    const productSelector = (state) => {
      return state.product.productsByCategory;
    };

    const products$ = this.store.select(productSelector);

    products$.subscribe((productsByCategory) => {
      console.log("productsByCategory", productsByCategory);
      this.latest = productsByCategory.latest.products;
      this.bestseller = productsByCategory.bestseller.products;
      this.special = productsByCategory.special.products;
    });
  };
}
