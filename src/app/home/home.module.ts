import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared/shared.module";
import { HomeEmployeesComponent } from "./home-employees/home-employees.component";
import { HomeBlogsComponent } from "./home-blogs/home-blogs.component";
import { HomeCarouselComponent } from "./home-carousel/home-carousel.component";
import { HomeBrandsComponent } from "./home-brands/home-brands.component";
import { HomeProductTabsComponent } from "./home-product-tabs/home-product-tabs.component";

@NgModule({
  declarations: [
    HomeComponent,
    HomeEmployeesComponent,
    HomeBlogsComponent,
    HomeCarouselComponent,
    HomeBrandsComponent,
    HomeProductTabsComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, NgbModule],
})
export class HomeModule {}
