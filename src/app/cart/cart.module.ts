import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./cart.component";
import { SharedModule } from "../shared/shared.module";
import { CartItemsComponent } from "./cart-items/cart-items.component";
import { CartVouchersComponent } from "./cart-vouchers/cart-vouchers.component";
import { CartSummaryComponent } from "./cart-summary/cart-summary.component";
import { CartSidebarComponent } from "./cart-sidebar/cart-sidebar.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    CartComponent,
    CartItemsComponent,
    CartVouchersComponent,
    CartSummaryComponent,
    CartSidebarComponent,
  ],
  imports: [CommonModule, CartRoutingModule, SharedModule, FormsModule],
})
export class CartModule {}
