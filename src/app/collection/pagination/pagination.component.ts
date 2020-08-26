import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { SetSelectedPageNo } from "src/app/product/product.actions";
import { ProductService } from "src/app/product/product.service";
import { PaginationService } from "./pagination.service";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit {
  private pages;
  private filters;
  private selectedPageNo = 1;
  private loading = false;

  constructor(
    private store: Store<any>,
    private productService: ProductService,
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.getPages();
  }

  private getPages = () => {
    const filtersSelector = (state) => {
      return state.product.filters;
    };

    let pages$ = this.store.select(filtersSelector);

    pages$.subscribe((filters) => {
      this.pages = filters.pages;
      this.filters = filters;
    });
  };

  private getSelectedPage = (newPageNo, direction) => {
    let fetchData = false;

    if (direction === "next") {
      if (this.filters.pageNo < this.pages.length) {
        this.store.dispatch(new SetSelectedPageNo(direction, null));
        fetchData = true;
      }
    } else if (direction === "previous") {
      if (this.filters.pageNo > 1) {
        this.store.dispatch(new SetSelectedPageNo(direction, null));
        fetchData = true;
      }
    } else if (newPageNo && newPageNo !== this.filters.pageNo) {
      fetchData = true;
      this.store.dispatch(new SetSelectedPageNo(null, newPageNo));
    }

    if (fetchData) {
      this.productService
        .getProducts(this.filters, this.setLoading)
        .subscribe();
      this.selectedPageNo = this.filters.pageNo;
    }
  };

  public setLoading = (value) => {
    this.paginationService.publishingLoading(value);
  };
}
