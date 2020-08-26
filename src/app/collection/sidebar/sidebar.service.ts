import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  public loadingSubject: Subject<boolean> = new Subject();

  constructor() {}

  public publishingLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }
}
