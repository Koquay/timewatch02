import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { timer } from "rxjs";
import { CloseMessage } from "./message.actions";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
})
export class MessageComponent implements OnInit {
  private error;
  private info;
  private displayMessage;
  private title;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.getMessage();
  }

  private getMessage = () => {
    const messageSelector = (state) => {
      return state.message;
    };

    let message$ = this.store.select(messageSelector);

    message$.subscribe((message) => {
      this.error = message.error;
      this.info = message.info;
      this.title = message.title;
      this.displayMessage = message.error || message.info;

      if (this.displayMessage) {
        this.clearMessageAfterTimeOut();
      }
    });
  };

  private clearMessageAfterTimeOut = () => {
    let subscriber = timer(40000).subscribe(() => {
      subscriber.unsubscribe();

      this.closeMessage();
    });
  };

  private closeMessage = () => {
    this.store.dispatch(new CloseMessage());
  };
}
