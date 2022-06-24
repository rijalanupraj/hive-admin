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

export const deleteUser = (userId, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.DELETE_USER_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`${API_URL}/admin/user/deleteuser/${userId}`, options);

    dispatch({
      type: TYPES.DELETE_USER_SUCCESS,
      payload: { userId }
    });
    enqueueSnackbar("User deleted successfully", { variant: "success" });
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_USER_FAIL,
      payload: { error: err.response.data.message }
    });
    enqueueSnackbar(err.response.data.message, { variant: "error" });
  }
};

export const toggleBanUser = (userId, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.BAN_TOGGLE_USER_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(`${API_URL}/admin/user/bantoggle/${userId}`, {}, options);

    dispatch({
      type: TYPES.BAN_TOGGLE_USER_SUCCESS,
      payload: { userId, isBanned: response.data.isBanned }
    });
    console.log(response.data.isBanned);
    if (response.data.isBanned) {
      enqueueSnackbar("User banned successfully", { variant: "success" });
    } else {
      enqueueSnackbar("User unbanned successfully", { variant: "success" });
    }
  } catch (err) {
    dispatch({
      type: TYPES.BAN_TOGGLE_USER_FAIL,
      payload: { error: err.response.data.message }
    });
    enqueueSnackbar(err.response.data.message, { variant: "error" });
  }
};

export const viewReportedUser = userId => async (dispatch, getState) => {
  dispatch({ type: TYPES.VIEW_REPORTED_USER_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/admin/report/userreports/`, options);

    dispatch({
      type: TYPES.VIEW_REPORTED_USER_SUCCESS,
      payload: { reports: response.data.allUserReport }
    });
  } catch (err) {
    dispatch({
      type: TYPES.VIEW_REPORTED_USER_FAIL,
      payload: { error: err.response.data.message }
    });
  }
};

export const viewAllVerificationRequests = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.GET_ALL_VERIFICATION_REQUESTS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/admin/user/view-allrequest`, options);

    dispatch({
      type: TYPES.GET_ALL_VERIFICATION_REQUESTS_SUCCESS,
      payload: { requests: response.data.allVerificationRequests }
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_ALL_VERIFICATION_REQUESTS_FAIL,
      payload: { error: err.response.data.message }
    });
  }
};

export const approveVerificationRequest =
  (requestId, userId, enqueueSnackbar) => async (dispatch, getState) => {
    dispatch({ type: TYPES.ACCEPT_VERIFICATION_REQUEST_LOADING });

    try {
      const options = attachTokenToHeaders(getState);
      const response = await axios.put(
        `${API_URL}/admin/user/approve/${requestId}/${userId}`,
        {},
        options
      );

      dispatch({
        type: TYPES.ACCEPT_VERIFICATION_REQUEST_SUCCESS,
        payload: { requestId, userId, userVerified: response.data.userVerified }
      });
      enqueueSnackbar("Verification request approved successfully", { variant: "success" });
    } catch (err) {
      dispatch({
        type: TYPES.ACCEPT_VERIFICATION_REQUEST_FAIL,
        payload: {
          error: err?.response?.data?.message ?? "Something went wrong"
        }
      });
      enqueueSnackbar(err?.response?.data?.message ?? "Something went wrong", { variant: "error" });
    }
  };

export const rejectVerificationRequest =
  (requestId, userId, enqueueSnackbar) => async (dispatch, getState) => {
    dispatch({ type: TYPES.REJECT_VERIFICATION_REQUEST_LOADING });

    try {
      const options = attachTokenToHeaders(getState);
      const response = await axios.put(
        `${API_URL}/admin/user/reject/${requestId}/${userId}`,
        {},
        options
      );

      dispatch({
        type: TYPES.REJECT_VERIFICATION_REQUEST_SUCCESS,
        payload: { requestId, userId, userVerified: response.data.userVerified }
      });
      enqueueSnackbar("Verification request rejected successfully", { variant: "success" });
    } catch (err) {
      dispatch({
        type: TYPES.REJECT_VERIFICATION_REQUEST_FAIL,
        payload: { error: err.response.data.message }
      });
      enqueueSnackbar(err.response.data.message, { variant: "error" });
    }
  };

export const verifyUserToggle = (userId, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.VERIFY_USER_TOGGLE_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(
      `${API_URL}/admin/user/verify-unverify/${userId}`,
      {},
      options
    );

    dispatch({
      type: TYPES.VERIFY_USER_TOGGLE_SUCCESS,
      payload: { userId, isVerified: response.data.isVerified }
    });

    if (response.data.isVerified) {
      enqueueSnackbar("User verified successfully", { variant: "success" });
    } else {
      enqueueSnackbar("User unverified successfully", { variant: "success" });
    }
  } catch (err) {
    dispatch({
      type: TYPES.VERIFY_USER_TOGGLE_FAIL,
      payload: { error: err.response.data.message }
    });
    enqueueSnackbar(err.response.data.message || "Something went wrong", { variant: "error" });
  }
};

export const warnUser = (userId, jsonData, enqueueSnackbar) => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(
      `${API_URL}/admin/user/warn-user/${userId}`,
      jsonData,
      options
    );
    enqueueSnackbar("User warned successfully", { variant: "success" });
  } catch (err) {
    enqueueSnackbar(err.response.data.message || "Something went wrong", { variant: "error" });
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
