import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProductService } from "../product/product.service";

@Component({
  selector: "app-collection",
  templateUrl: "./collection.component.html",
  styleUrls: ["./collection.component.scss"],
})
export class CollectionComponent implements OnInit {
  private productFilters;

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

    await product$.subscribe((product) => {
      this.productFilters = product.filters;
      console.log("productFilters", this.productFilters);
    });

    this.productService.getProducts(this.productFilters).subscribe();
  };
}
