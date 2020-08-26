import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProductService } from "../product/product.service";
import { SetActiveNav } from "../shared/components/header/header.actions";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SidebarService } from "./sidebar/sidebar.service";

@Component({
  selector: "app-collection",
  templateUrl: "./collection.component.html",
  styleUrls: ["./collection.component.scss"],
})
export class CollectionComponent implements OnInit {
  private productFilters;
  private loading = false;

  constructor(
    private productService: ProductService,
    private store: Store<any>,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.setActiveNav("collectionActive");
    this.getChildLoading();
  }

  private getChildLoading = () => {
    this.sidebarService.loadingSubject.subscribe((loading) => {
      this.loading = loading;
    });
  };

  private setActiveNav = (nav) => {
    this.store.dispatch(new SetActiveNav(nav));
  };

  private getProducts = async () => {
    let productStore;

    const productSelector = (state) => {
      return state.product;
    };

    let product$ = this.store.select(productSelector);

    await product$.subscribe((product) => {
      this.productFilters = product.filters;
    });

    this.productService
      .getProducts(this.productFilters, this.setLoading)
      .subscribe();
  };

  public setLoading = (value) => {
    this.loading = value;
  };
}
