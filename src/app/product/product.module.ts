import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";
import { SharedModule } from "../shared/shared.module";
import { ProductDisplayComponent } from "./product-display/product-display.component";
import { ProductDescriptionComponent } from "./product-description/product-description.component";
import { ProductInfoComponent } from "./product-info/product-info.component";
import { ProductRelatedComponent } from "./product-related/product-related.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { ProductSidebarComponent } from './product-sidebar/product-sidebar.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDisplayComponent,
    ProductDescriptionComponent,
    ProductInfoComponent,
    ProductRelatedComponent,
    ProductSidebarComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
  ],
})
export class ProductModule {}
