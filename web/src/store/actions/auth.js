import * as actionTypes from "./actionTypes";
import api, { apiFormData } from "../../utils/api";
import { v4 } from "uuid";
import { createAlert } from "./alerts";

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (payload) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const authLoadUser = (payload) => {
  return {
    type: actionTypes.AUTH_LOAD_USER,
    payload,
  };
};

export const authUserUpdate = (payload) => {
  return {
    type: actionTypes.AUTH_USER_UPDATE,
    payload,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const loadUser = () => (dispatch) => {
  dispatch(authStart());
  api
    .get("rest-auth/user/")
    .then((res) => {
      dispatch(authLoadUser(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authLogin = (formData) => (dispatch) => {
  dispatch(authStart());
  api
    .post("rest-auth/login/", formData)
    .then((res) => {
      dispatch(authSuccess(res.data));
      let successAlert = [
        {
          id: v4(),
          type: "success",
          msg: "User logged in",
        },
      ];
      dispatch(createAlert(successAlert));
    })
    .catch((err) => {
      const errors = err.response.data.non_field_errors;
      let alertErrors = [];

      errors.map((error) => {
        alertErrors.push({
          id: v4(),
          type: "danger",
          msg: error,
        });
      });

      window.scrollTo(0, 0);

      dispatch(authFail());
      dispatch(createAlert(alertErrors));
    });
};

export const authRegister = (formData) => (dispatch) => {
  dispatch(authStart());
  api
    .post("rest-auth/registration/", formData)
    .then((res) => {
      dispatch(authSuccess(res.data));
      let successAlert = [
        {
          id: v4(),
          type: "success",
          msg: "User registered",
        },
      ];
      dispatch(createAlert(successAlert));
    })
    .catch((err) => {
      const errors = err.response.data;
      let alertErrors = [];
      for (let key in errors) {
        let msg = "";
        if (errors[key][0] === "This field may not be blank.") {
          msg = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        } else {
          msg = errors[key][0];
        }

        alertErrors.push({
          id: v4(),
          type: "danger",
          msg,
        });
      }

      window.scrollTo(0, 0);

      dispatch(authFail());
      dispatch(createAlert(alertErrors));
    });
};

export const updateUser = (data) => (dispatch) => {
  const formData = new FormData();
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);

  if (data.profile_image) formData.append("profile_image", data.profile_image);

  apiFormData
    .put("rest-auth/user/", formData)
    .then((res) => {
      dispatch(authUserUpdate(res.data));
      dispatch(
        createAlert([
          {
            id: v4(),
            type: "success",
            msg: "User Updated!",
          },
        ])
      );
    })
    .catch((err) => {
      const msg = err.response.data.profile_image[0];
      const alertError = {
        id: v4(),
        type: "danger",
        msg,
      };
      dispatch(createAlert([alertError]));
    });
};

export const authLogout = () => (dispatch) => {
  api
    .post("rest-auth/logout/")
    .then((res) => {
      dispatch(logout());
    })
    .catch((err) => console.log(err));
};
