import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthenticationGuard } from "./authentication/authentication.guard";
// import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  // {
  //   path: "",
  //   component: LoginComponent,
  // },
  {
    path: "",
    loadChildren: "./authentication/authentication.module#AuthenticationModule",
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "collection",
    loadChildren: "./collection/collection.module#CollectionModule",
    canActivate: [AuthenticationGuard],
  },
  {
    path: "product",
    loadChildren: "./product/product.module#ProductModule",
    canActivate: [AuthenticationGuard],
  },
  {
    path: "cart",
    loadChildren: "./cart/cart.module#CartModule",
    canActivate: [AuthenticationGuard],
  },
  {
    path: "checkout",
    loadChildren: "./checkout/checkout.module#CheckoutModule",
    canActivate: [AuthenticationGuard],
  },
  {
    path: "",
    pathMatch: "prefix",
    redirectTo: "login",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
