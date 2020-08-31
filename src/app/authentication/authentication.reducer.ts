import {
  AuthenticationActionUnion,
  LoginActionTypes,
  SetLoggedIn,
} from "./authentication.actions";

export const AuthenticationReducer = (
  state = initialState,
  action: AuthenticationActionUnion
) => {
  console.log("action", action);
  switch (action.type) {
    case LoginActionTypes.SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
      };

    case LoginActionTypes.SET_LOGGED_OUT:
      console.log("LOGIN OUT");
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};

const initialState = {
  loggedIn: false,
};
