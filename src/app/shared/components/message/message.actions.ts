import { Action } from "@ngrx/store";

export enum MessageTypes {
  SET_ERROR = "SET_ERROR",
  SET_INFO = "SET_INFO",
  CLOSE_MESSAGE = "CLOSE_MESSAGE",
}

export class SetError implements Action {
  readonly type = MessageTypes.SET_ERROR;

  constructor(public error) {}
}

export class SetInfo implements Action {
  readonly type = MessageTypes.SET_INFO;

  constructor(public info) {}
}

export class CloseMessage implements Action {
  readonly type = MessageTypes.CLOSE_MESSAGE;

  constructor() {}
}

export type MessageActionsUnion = SetError | SetInfo | CloseMessage;
