import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedRoutingModule } from "./shared-routing.module";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeEmployeesComponent } from "../home/home-employees/home-employees.component";
import { HomeBlogsComponent } from "../home/home-blogs/home-blogs.component";
import { HomeCarouselComponent } from "../home/home-carousel/home-carousel.component";
import { HomeBrandsComponent } from "../home/home-brands/home-brands.component";
import { HomeProductTabsComponent } from "../home/home-product-tabs/home-product-tabs.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeEmployeesComponent,
    HomeBlogsComponent,
    HomeCarouselComponent,
    HomeBrandsComponent,
    HomeProductTabsComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeEmployeesComponent,
    HomeBlogsComponent,
    HomeCarouselComponent,
    HomeBrandsComponent,
    HomeProductTabsComponent,
  ],
  imports: [CommonModule, SharedRoutingModule],
})
export class SharedModule {}
