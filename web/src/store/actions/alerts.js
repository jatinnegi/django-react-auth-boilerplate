import * as actionTypes from "./actionTypes";

export const createAlert = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_ALERT,
    payload,
  });
};

export const clearAlert = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ALERT,
    payload,
  });
};
