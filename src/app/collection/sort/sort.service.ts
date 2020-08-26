import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SortService {
  public loadingSubject: Subject<boolean> = new Subject();

  constructor() {}

  public publishLoading = (loading: boolean) => {
    this.loadingSubject.next(loading);
  };
}
