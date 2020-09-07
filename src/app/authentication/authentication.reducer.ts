import {
  AuthenticationActionUnion,
  LoginActionTypes,
  SetLoggedIn,
} from "./authentication.actions";

export const AuthenticationReducer = (
  state = initialState,
  action: AuthenticationActionUnion
) => {
  // console.log("action", action);
  switch (action.type) {
    case LoginActionTypes.SET_LOGGED_IN:
      addLoggedInoLocalStorage(true);
      return {
        ...state,
        loggedIn: true,
      };

    case LoginActionTypes.SET_LOGGED_OUT:
      addLoggedInoLocalStorage(false);
      return {
        ...state,
        loggedIn: false,
      };

    case LoginActionTypes.INIT_LOGGED_IN:
      const loggedIn = initLoggedInoLocalStorage();
      // console.log("loggedIn", loggedIn);
      return {
        ...state,
        loggedIn: loggedIn,
      };

    default:
      return state;
  }
};

const initLoggedInoLocalStorage = () => {
  let localStorageData = JSON.parse(localStorage.getItem("timewatch02"));
  if (!localStorageData) {
    localStorageData = JSON.parse(JSON.stringify(initialState));
  }

  return localStorageData.loggedIn;
};

const addLoggedInoLocalStorage = (loggedIn) => {
  let localStorageData = JSON.parse(localStorage.getItem("timewatch02"));
  if (!localStorageData) {
    localStorageData = JSON.parse(JSON.stringify(initialState));
  }
  localStorageData.loggedIn = loggedIn;

  localStorage.setItem("timewatch02", JSON.stringify(localStorageData));
};

const initialState = {
  loggedIn: false,
};
