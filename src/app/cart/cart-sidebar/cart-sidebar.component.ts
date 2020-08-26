import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-cart-sidebar",
  templateUrl: "./cart-sidebar.component.html",
  styleUrls: ["./cart-sidebar.component.scss"],
})
export class CartSidebarComponent implements OnInit {
  private latest;
  private bestseller;
  private special;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.getProductByCategories();
  }

  private getProductByCategories = () => {
    const productSelector = (state) => {
      return state.product.productsByCategory;
    };

    const productsByCategory$ = this.store.select(productSelector);

    productsByCategory$.subscribe((productsByCategory) => {
      if (!productsByCategory.latest) {
        let localStorageData = JSON.parse(localStorage.getItem("timewatch02"));
        productsByCategory = localStorageData.productsByCategory;
      }
      this.latest = productsByCategory.latest.products;
      this.bestseller = productsByCategory.bestseller.products;
      this.special = productsByCategory.special.products;
    });
  };
}
