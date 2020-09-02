import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login/login.service";
import { SetInfo } from "../shared/components/message/message.actions";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class AuthenticationGuard implements CanActivate {
  private isLoggedIn = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.getLoggedIn();

    if (!this.isLoggedIn) {
      this.store.dispatch(new SetInfo("Please log in to proceed."));
      this.router.navigate(["/"]);
    }

    return this.isLoggedIn;
  }

  private getLoggedIn = () => {
    this.loginService.getLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  };
}
