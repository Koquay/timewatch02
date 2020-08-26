import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { SetSortOption } from "src/app/product/product.actions";
import { ProductService } from "src/app/product/product.service";
import { SortService } from "./sort.service";

@Component({
  selector: "app-sort",
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.scss"],
})
export class SortComponent implements OnInit {
  private sortOptions;
  private selectedOption;
  private sortFilters;
  private loading = false;

  constructor(
    private store: Store<any>,
    private productService: ProductService,
    private sortService: SortService
  ) {}

  ngOnInit() {
    this.getSortFilters();
  }

  private getSortFilters = () => {
    const filterSelector = (state) => {
      return state.product.filters;
    };

    let sortFilters$ = this.store.select(filterSelector);

    sortFilters$.subscribe((sortFilters) => {
      this.sortFilters = sortFilters;
      this.sortOptions = sortFilters.sortOptions;
    });
  };

  private changeOption = (optionId) => {
    this.store.dispatch(new SetSortOption(optionId));
    this.productService
      .getProducts(this.sortFilters, this.setLoading)
      .subscribe();
  };

  public setLoading = (value) => {
    this.sortService.publishLoading(value);
  };
}
