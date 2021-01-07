import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  user: null,
};

const authStart = (state, payload) => {
  return updateObject(state, {
    loading: true,
  });
};

const authSuccess = (state, payload) => {
  return updateObject(state, {
    token: payload.key,
    isAuthenticated: true,
    loading: false,
  });
};

const authLoadUser = (state, payload) => {
  return updateObject(state, {
    user: payload,
    isAuthenticated: true,
    loading: false,
  });
};

const authUpdateUser = (state, payload) => {
  return updateObject(state, {
    user: payload,
  });
};

const authFail = (state, payload) => {
  return updateObject(state, {
    loading: false,
  });
};

const authLogout = (state, payload) => {
  return updateObject(state, {
    token: null,
    isAuthenticated: false,
    user: null,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.AUTH_START:
      return authStart(state, payload);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, payload);

    case actionTypes.AUTH_LOAD_USER:
      return authLoadUser(state, payload);

    case actionTypes.AUTH_USER_UPDATE:
      return authUpdateUser(state, payload);

    case actionTypes.AUTH_FAIL:
      return authFail(state, payload);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, payload);

    default:
      return state;
  }
};

export default reducer;
