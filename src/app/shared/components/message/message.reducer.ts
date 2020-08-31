import { MessageActionsUnion, MessageTypes } from "./message.actions";
import { timer } from "rxjs";

export const MessageReducer = (
  state = initialState,
  action: MessageActionsUnion
) => {
  switch (action.type) {
    case MessageTypes.SET_ERROR:
      return {
        ...state,
        error: action.error,
        title: "Error",
        info: "",
      };

    case MessageTypes.SET_INFO:
      return {
        ...state,
        error: "",
        info: action.info,
        title: "Info",
      };

    case MessageTypes.CLOSE_MESSAGE:
      return {
        ...state,
        error: "",
        info: "",
        title: "",
      };

    default:
      return state;
  }
};

const initialState = {
  error: "",
  info: "",
  title: "",
};
