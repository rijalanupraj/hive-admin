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

export const getAllAdmins = navigate => async (dispatch, getState) => {
  dispatch({ type: TYPES.ALL_ADMINS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/admin/user/alladmins`, options);

    dispatch({
      type: TYPES.ALL_ADMINS_SUCCESS,
      payload: { admins: response.data.admins }
    });
  } catch (err) {
    dispatch({
      type: TYPES.ALL_ADMINS_FAIL,
      payload: { error: err.response.data.message }
    });
  }
};

export const createAdmin = (data, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.CREATE_ADMIN_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(`${API_URL}/admin/create-admin`, data, options);

    dispatch({
      type: TYPES.CREATE_ADMIN_SUCCESS,
      payload: { admin: response.data.admin }
    });
    enqueueSnackbar("Admin created successfully", { variant: "success" });
  } catch (err) {
    dispatch({
      type: TYPES.CREATE_ADMIN_FAIL,
      payload: { error: err.response.data.message }
    });
    enqueueSnackbar(err.response.data.message, { variant: "error" });
  }
};

export const deleteAdminUser = (adminId, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.DELETE_ADMIN_USER_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`${API_URL}/admin/user/deleteadmin/${adminId}`, options);

    dispatch({
      type: TYPES.DELETE_ADMIN_USER_SUCCESS,
      payload: { adminId }
    });
    enqueueSnackbar("Admin deleted successfully", { variant: "success" });
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_ADMIN_USER_FAIL,
      payload: { error: err.response.data.message }
    });
    enqueueSnackbar(err.response.data.message, { variant: "error" });
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
