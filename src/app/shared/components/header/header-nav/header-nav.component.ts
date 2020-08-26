import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { SetActiveNav } from "../header.actions";

@Component({
  selector: "app-header-nav",
  templateUrl: "./header-nav.component.html",
  styleUrls: ["./header-nav.component.scss"],
})
export class HeaderNavComponent implements OnInit {
  private activeNav;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.getActiveNav();
  }

  private getActiveNav = () => {
    const headerSelector = (state) => {
      return state.header;
    };

    const headerNav$ = this.store.select(headerSelector);

    headerNav$.subscribe((header) => {
      this.activeNav = header.activeNav;
    });
  };
}
