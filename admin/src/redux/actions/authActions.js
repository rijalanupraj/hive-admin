// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const loadMe = navigate => async (dispatch, getState) => {
  dispatch({ type: TYPES.ME_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/admin/me`, options);

    dispatch({
      type: TYPES.ME_SUCCESS,
      payload: { me: response.data.me }
    });
    navigate("/dashboard");
  } catch (err) {
    dispatch({
      type: TYPES.ME_FAIL,
      payload: { error: err.response.data.message }
    });
    if (navigate) {
      navigate("/login", {
        replace: true
      });
    }
  }
};

export const loginUserWithEmail =
  (formData, navigate, redirectTo) => async (dispatch, getState) => {
    dispatch({ type: TYPES.LOGIN_WITH_EMAIL_LOADING });
    try {
      const response = await axios.post(`${API_URL}/admin/login`, formData);

      dispatch({
        type: TYPES.LOGIN_WITH_EMAIL_SUCCESS,
        payload: { token: response.data.token, me: response.data.me }
      });

      dispatch(loadMe());
      navigate(redirectTo || "/dashboard", { replace: true });
    } catch (err) {
      dispatch({
        type: TYPES.LOGIN_WITH_EMAIL_FAIL,
        payload: { error: err.response.data.message }
      });
    }
  };

// Log user out
export const logOutUser = navigate => async dispatch => {
  try {
    dispatch({
      type: TYPES.LOGOUT_SUCCESS,
      payload: { me: null, token: null }
    });
    // if (navigate) navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

export const attachTokenToHeaders = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
