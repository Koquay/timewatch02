import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  SetColor,
  SetBrand,
  SetPriceRange,
} from "src/app/product/product.actions";
import { ProductService } from "src/app/product/product.service";
import { SidebarService } from "./sidebar.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  private filters;
  private colors;
  private prices;
  private sizes;
  private brands;
  public childLoading = false;

  constructor(
    private store: Store<any>,
    private productService: ProductService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.getStoreData();
  }

  private getStoreData = () => {
    const filtersSelector = (state) => {
      return state.product.filters;
    };

    let filters$ = this.store.select(filtersSelector);

    filters$.subscribe((filters) => {
      this.filters = JSON.parse(JSON.stringify(filters));
      this.colors = JSON.parse(JSON.stringify(filters.colors));
      this.prices = JSON.parse(JSON.stringify(filters.prices));
      this.sizes = JSON.parse(JSON.stringify(filters.sizes));
      this.brands = JSON.parse(JSON.stringify(filters.brands));
    });
  };

  private handleColorChange = (color) => {
    this.store.dispatch(new SetColor(color));
    this.productService.getProducts(this.filters, this.setLoading).subscribe();
  };

  private handleBrandChange = (brand) => {
    this.store.dispatch(new SetBrand(brand));
    this.productService.getProducts(this.filters, this.setLoading).subscribe();
  };

  private handlePricesRangeChange = (range) => {
    this.store.dispatch(new SetPriceRange(range));
    this.productService.getProducts(this.filters, this.setLoading).subscribe();
  };

  public setLoading = (value) => {
    this.sidebarService.publishingLoading(value);
  };
}
