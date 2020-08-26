import { HeaderActionTypes, HeaderActionsUnion } from "./header.actions";

export const HeaderReducer = (
  state = initialState,
  action: HeaderActionsUnion
) => {
  switch (action.type) {
    case HeaderActionTypes.SET_ACTIVE_NAV:
      return {
        ...state,
        activeNav: action.activeNav,
      };

    default:
      return state;
  }
};

const initialState = {
  activeNav: "homeActive",
};
