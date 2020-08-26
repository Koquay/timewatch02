import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { HomeService } from "./home.service";
import { productFilters } from "../product/product.filters";
import { ProductService } from "../product/product.service";
import { SetActiveNav } from "../shared/components/header/header.actions";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  private carousel;
  private brands;
  private blogs;
  private employees;
  private productStore;
  private latest;
  private bestseller;
  private special;
  private latestActive = false;
  private specialActive = false;
  private bestsellerActive = true;
  private loading = false;

  constructor(
    private store: Store<any>,
    private homeService: HomeService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.setActiveNav("homeActive");
    this.getHomeStaticData();
    this.getProductsByCategory();
  }

  private setActiveNav = (nav) => {
    this.store.dispatch(new SetActiveNav(nav));
  };

  private getProductsByCategory = async () => {
    let category = ["latest", "special", "bestseller"];

    this.productService
      .getProductsByCategory(category, this.setLoading)
      .subscribe((products) => {
        const productSelector = (state) => {
          return state.product.productsByCategory;
        };

        let productsByCategory$ = this.store.select(productSelector);

        productsByCategory$.subscribe((productsByCategory) => {
          this.latest = productsByCategory.latest.products;
          this.bestseller = productsByCategory.bestseller.products;
          this.special = productsByCategory.special.products;
        });
      });
  };

  private getHomeStaticData = () => {
    const homeSelector = (state) => {
      return state.home;
    };

    let home$ = this.store.select(homeSelector);
    home$.subscribe((homeStaticData) => {
      this.carousel = homeStaticData.carousel;
      this.brands = homeStaticData.brands;
      this.blogs = homeStaticData.blogs;
      this.employees = homeStaticData.employees;
    });
  };

  private setTabActive = (tab) => {
    switch (tab) {
      case "latestActive":
        this.latestActive = true;
        this.specialActive = false;
        this.bestsellerActive = false;
        break;
      case "specialActive":
        this.latestActive = false;
        this.specialActive = true;
        this.bestsellerActive = false;
        break;
      case "bestsellerActive":
        this.latestActive = false;
        this.specialActive = false;
        this.bestsellerActive = true;
        break;
    }
  };

  public setLoading = (value) => {
    this.loading = value;
  };
}
