import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/product/product.service";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-home-product-tabs",
  templateUrl: "./home-product-tabs.component.html",
  styleUrls: ["./home-product-tabs.component.scss"],
})
export class HomeProductTabsComponent implements OnInit {
  private productStore;
  private latest;
  private bestseller;
  private special;
  private latestActive = false;
  private specialActive = false;
  private bestsellerActive = true;
  private loading = false;

  constructor(
    private productService: ProductService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  private getProducts = async () => {
    let productStore;

    const productSelector = (state) => {
      return state.product;
    };

    let product$ = this.store.select(productSelector);

    await product$.subscribe((productStoreIn) => {
      productStore = productStoreIn;
    });

    this.productService
      .getProducts(productStore.filters, this.setLoading)
      .subscribe((productData) => {
        this.categorizeProducts(productData.products);
      });
  };

  private categorizeProducts = (products) => {
    this.latest = products.filter((product) =>
      product.category.includes("latest")
    );

    this.special = products.filter((product) =>
      product.category.includes("special")
    );

    this.bestseller = products.filter((product) =>
      product.category.includes("bestseller")
    );
  };

  public setLoading = (value) => {
    this.loading = value;
  };
}
