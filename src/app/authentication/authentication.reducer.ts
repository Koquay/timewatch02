import {
  AuthenticationActionUnion,
  LoginActionTypes,
} from "./authentication.actions";

export const AuthenticationReducer = (
  state = initialState,
  action: AuthenticationActionUnion
) => {
  switch (LoginActionTypes.SET_LOGGED_IN) {
    case LoginActionTypes.SET_LOGGED_IN:
      console.log("LoginActionTypes.SET_LOGGED_IN", action.loggedIn);
      return {
        ...state,
        loggedIn: true,
      };
    default:
      return state;
  }
};

const initialState = {
  loggedIn: false,
};
