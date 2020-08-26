import { Component, OnInit } from "@angular/core";
import { SetActiveNav } from "../shared/components/header/header.actions";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.setActiveNav("cartActive");
  }

  private setActiveNav = (nav) => {
    this.store.dispatch(new SetActiveNav(nav));
  };
}
