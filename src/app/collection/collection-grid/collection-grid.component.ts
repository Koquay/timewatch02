import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-collection-grid",
  templateUrl: "./collection-grid.component.html",
  styleUrls: ["./collection-grid.component.scss"],
})
export class CollectionGridComponent implements OnInit {
  private products;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.getProducts();
  }

  private getProducts = async () => {
    const productSelector = (state) => {
      return state.product.products;
    };

    let products$ = this.store.select(productSelector);

    products$.subscribe((products) => {
      this.products = products;
      console.log("products", products);
    });
  };
}
