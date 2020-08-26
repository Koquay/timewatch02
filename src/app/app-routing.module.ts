import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
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
  },
  {
    path: "collection",
    loadChildren: "./collection/collection.module#CollectionModule",
  },
  {
    path: "product",
    loadChildren: "./product/product.module#ProductModule",
  },
  {
    path: "cart",
    loadChildren: "./cart/cart.module#CartModule",
  },
  {
    path: "checkout",
    loadChildren: "./checkout/checkout.module#CheckoutModule",
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
