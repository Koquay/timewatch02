import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-home-carousel",
  templateUrl: "./home-carousel.component.html",
  styleUrls: ["./home-carousel.component.scss"],
})
export class HomeCarouselComponent implements OnInit {
  private carousel;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.getStaticData();
  }

  private getStaticData = () => {
    const carouselSelector = (state) => {
      return state.home.carousel;
    };

    let carousel$ = this.store.select(carouselSelector);
    carousel$.subscribe((carouselData) => {
      this.carousel = carouselData;
    });
  };
}
