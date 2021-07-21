import userTypes from "./userTypes";
import { setfeedback } from "../index";
import axios from "axios";

const URL_API = process.env.REACT_APP_URL_API;

export const registerUserRequested = () => {
  return {
    type: userTypes.REGISTER_USER_REQUESTED,
  };
};

export const registerUser = (formSignupUser) => {
  return (dispatch) => {
    dispatch(registerUserRequested());

    axios
      .post(URL_API + "/auth/signup", {
        formSignupUser,
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(
          setfeedback({
            variant: "success",
            message: response.data.message,
          })
        );

        dispatch(registerUserSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(
          setfeedback({
            variant: "danger",
            message: message,
          })
        );
        dispatch(registerUserFail(error));
      });
  };
};

export const registerUserSuccess = (data) => {
  return {
    type: userTypes.REGISTER_USER_SUCCESS,
    payload: data,
  };
};

export const registerUserFail = (data) => {
  return {
    type: userTypes.REGISTER_USER_FAIL,
    payload: data,
  };
};

export const login = (formLogin) => {
  return (dispatch) => {
    axios
      .post(URL_API + "/auth/signin", {
        formLogin,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        dispatch({
          type: userTypes.LOGIN_SUCCESS,
          payload: { user: response.data },
        });
      })
      .catch((error) => {
        // console.log(error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(
          setfeedback({
            variant: "danger",
            message: message,
          })
        );

        dispatch({
          type: userTypes.LOGIN_FAIL,
        });
      });
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");

  dispatch({
    type: userTypes.LOGOUT,
  });
};
