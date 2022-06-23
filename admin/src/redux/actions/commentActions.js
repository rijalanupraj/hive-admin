// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const getAllComments = navigate => async (dispatch, getState) => {
  dispatch({ type: TYPES.GET_ALL_COMMENTS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/admin/comment`, options);

    dispatch({
      type: TYPES.GET_ALL_COMMENTS_SUCCESS,
      payload: { comments: response.data.comments }
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_ALL_COMMENTS_SUCCESS,
      payload: { error: err.response.data.message }
    });
  }
};

export const deleteComment = (commentId, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.DELETE_COMMENT_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`${API_URL}/admin/comment/delete/${commentId}`, options);

    dispatch({
      type: TYPES.DELETE_COMMENT_SUCCESS,
      payload: { commentId: commentId }
    });
    enqueueSnackbar("Comment deleted successfully", { variant: "success" });
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_COMMENT_SUCCESS,
      payload: { error: err.response.data.message }
    });
    enqueueSnackbar("Comment deletion failed", { variant: "error" });
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
