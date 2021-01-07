import api, { apiFormData } from "./api";
import store from "../store";
import { loadUser } from "../store/actions/auth";

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    apiFormData.defaults.headers.common["Authorization"] = `Token ${token}`;

    localStorage.setItem("token", token);
    store.dispatch(loadUser());
  } else {
    delete api.defaults.headers.common["Authorization"];
    delete apiFormData.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

export default setAuthToken;
