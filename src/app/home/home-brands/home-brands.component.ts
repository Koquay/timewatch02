import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-home-brands",
  templateUrl: "./home-brands.component.html",
  styleUrls: ["./home-brands.component.scss"],
})
export class HomeBrandsComponent implements OnInit {
  private brands;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.getStaticData();
  }

  private getStaticData = () => {
    const brandsSelector = (state) => {
      return state.home.brands;
    };

    let brands$ = this.store.select(brandsSelector);
    brands$.subscribe((brandsData) => {
      console.log("brandsData", brandsData);
      this.brands = brandsData;
    });
  };
}
