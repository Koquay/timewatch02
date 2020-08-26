import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { SetSelectedProduct } from "./product.actions";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.setSelectedProduct();
  }

  private setSelectedProduct = () => {
    let productId = this.activatedRoute.snapshot.paramMap.get("productId");

    this.store.dispatch(new SetSelectedProduct(productId));
  };
}
