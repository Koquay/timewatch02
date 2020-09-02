import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { InitLoggedIn } from "./authentication/authentication.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "timewatch02";

  constructor(private store: Store<any>) {
    this.store.dispatch(new InitLoggedIn());
  }
}
