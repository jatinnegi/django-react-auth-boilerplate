import * as actionTypes from "../actions/actionTypes";

const initialState = [];

export default alert = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.CREATE_ALERT:
      return payload;
    case actionTypes.CLEAR_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};
