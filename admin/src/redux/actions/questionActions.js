// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const getAllQuestions = navigate => async (dispatch, getState) => {
  dispatch({ type: TYPES.ALL_QUESTIONS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/admin/question`, options);

    dispatch({
      type: TYPES.ALL_QUESTIONS_SUCCESS,
      payload: { questions: response.data.questions }
    });
  } catch (err) {
    dispatch({
      type: TYPES.ALL_QUESTIONS_SUCCESS,
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
