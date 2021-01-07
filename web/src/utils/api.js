import axios from "axios";
import store from "../store";
import * as actionTypes from "../store/actions/actionTypes";

const api = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiFormData = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: actionTypes.AUTH_LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
