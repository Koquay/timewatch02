import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { SidebarService } from "../sidebar/sidebar.service";
import { PaginationService } from "../pagination/pagination.service";
import { SortService } from "../sort/sort.service";

@Component({
  selector: "app-collection-grid",
  templateUrl: "./collection-grid.component.html",
  styleUrls: ["./collection-grid.component.scss"],
})
export class CollectionGridComponent implements OnInit {
  private products;
  private loading = false;

  constructor(
    private store: Store<any>,
    private sidebarService: SidebarService,
    private paginationService: PaginationService,
    private sortService: SortService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getChildLoading();
  }

  private getChildLoading = () => {
    this.sidebarService.loadingSubject.subscribe((loading) => {
      this.loading = loading;
    });
    this.paginationService.loadingSubject.subscribe((loading) => {
      this.loading = loading;
    });
    this.sortService.loadingSubject.subscribe((loading) => {
      this.loading = loading;
    });
  };

  private getProducts = async () => {
    const productSelector = (state) => {
      return state.product.products;
    };

    let products$ = this.store.select(productSelector);

    products$.subscribe((products) => {
      this.products = products;
    });
  };
}
