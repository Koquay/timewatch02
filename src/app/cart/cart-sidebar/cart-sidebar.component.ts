import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { CartService } from "../cart.service";

@Component({
  selector: "app-cart-sidebar",
  templateUrl: "./cart-sidebar.component.html",
  styleUrls: ["./cart-sidebar.component.scss"],
})
export class CartSidebarComponent implements OnInit {
  private latest;
  private bestseller;
  private special;

  constructor(private store: Store<any>, private cartService: CartService) {}

  ngOnInit() {
    this.getProductByCategories();
  }

  private addToCart = (productId) => {
    const payload = { quantity: 1, productId };
    this.cartService.addToCart(payload, this.setLoading).subscribe();
  };

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

  public setLoading = (value) => {
    // this.loading = value;
  };
}
