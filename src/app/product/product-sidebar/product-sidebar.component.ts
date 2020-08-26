import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { SetError } from "src/app/shared/components/message/message.actions";

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
      if (!productsByCategory.latest) {
        productsByCategory = JSON.parse(localStorage.getItem("timewatch02"));
      }

      if (!productsByCategory.latest) {
        this.store.dispatch(
          new SetError(
            "Product categories not loaded. Please log in to proceed."
          )
        );
      }
      this.latest = productsByCategory.latest.products;
      this.bestseller = productsByCategory.bestseller.products;
      this.special = productsByCategory.special.products;
    });
  };
}
