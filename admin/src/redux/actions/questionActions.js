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

export const deleteQuestion = (questionId, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.DELETE_QUESTION_LOADING });

  try {
    const options = attachTokenToHeaders(getState);

    await axios.delete(`${API_URL}/admin/question/deletequestion/${questionId}`, options);

    dispatch({
      type: TYPES.DELETE_QUESTION_SUCCESS,
      payload: { questionId: questionId }
    });
    enqueueSnackbar("Question deleted successfully", { variant: "success" });
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_QUESTION_SUCCESS,
      payload: { error: err.response.data.message }
    });
  }
};

export const hideUnHideQuestionToggle =
  (questionId, enqueueSnackbar) => async (dispatch, getState) => {
    dispatch({ type: TYPES.HIDE_UNHIDE_QUESTION_LOADING });

    try {
      const options = attachTokenToHeaders(getState);

      const response = await axios.post(
        `${API_URL}/admin/question/hide-unhide/${questionId}`,
        {},
        options
      );

      dispatch({
        type: TYPES.HIDE_UNHIDE_QUESTION_SUCCESS,
        payload: { questionId: questionId, isHide: response.data.isHide }
      });
      if (response.data.isHide) {
        enqueueSnackbar("Question hidden successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Question unhidden successfully", { variant: "success" });
      }
    } catch (err) {
      dispatch({
        type: TYPES.HIDE_UNHIDE_QUESTION_FAIL,
        payload: {
          error: err?.response?.data?.message ?? "Something went wrong"
        }
      });
      enqueueSnackbar("Solution update failed", { variant: "error" });
    }
  };

export const viewReportedQuestion = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.VIEW_REPORTED_QUESTION_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/admin/report/questionreports/`, options);

    dispatch({
      type: TYPES.VIEW_REPORTED_QUESTION_SUCCESS,
      payload: { reports: response.data.allQuestionReport }
    });
  } catch (err) {
    dispatch({
      type: TYPES.VIEW_REPORTED_QUESTION_FAIL,
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
