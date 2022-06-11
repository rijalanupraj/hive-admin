// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const getAllUsers = navigate => async (dispatch, getState) => {
  dispatch({ type: TYPES.ALL_USERS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/admin/user/allusers`, options);

    dispatch({
      type: TYPES.ALL_USERS_SUCCESS,
      payload: { users: response.data.users }
    });
  } catch (err) {
    dispatch({
      type: TYPES.ALL_USERS_FAIL,
      payload: { error: err.response.data.message }
    });
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
