// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const getAllSolutions = navigate => async (dispatch, getState) => {
  dispatch({ type: TYPES.ALL_SOLUTIONS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/admin/solution`, options);

    dispatch({
      type: TYPES.ALL_SOLUTIONS_SUCCESS,
      payload: { solutions: response.data.solutions }
    });
  } catch (err) {
    dispatch({
      type: TYPES.ALL_SOLUTIONS_FAIL,
      payload: { error: err.response.data.message }
    });
  }
};

export const deleteSolution = (solutionId, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.DELETE_SOLUTION_LOADING });

  try {
    const options = attachTokenToHeaders(getState);

    await axios.delete(`${API_URL}/admin/solution/deletesolution/${solutionId}`, options);

    dispatch({
      type: TYPES.DELETE_SOLUTION_SUCCESS,
      payload: { solutionId: solutionId }
    });
    enqueueSnackbar("Solution deleted successfully", { variant: "success" });
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_SOLUTION_FAIL,
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
