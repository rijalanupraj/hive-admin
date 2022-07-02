// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const getAllKanbanBoards = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.GET_ALL_KANBAN_BOARDS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/admin/kanban/board`, options);

    dispatch({
      type: TYPES.GET_ALL_KANBAN_BOARDS_SUCCESS,
      payload: { boards: response.data.boards }
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_ALL_KANBAN_BOARDS_FAIL,
      payload: { error: err?.response?.data?.message || "Something went wrong" }
    });
  }
};

export const createKanbanBoard = (data, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.CREATE_KANBAN_BOARD_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(`${API_URL}/admin/kanban/board`, data, options);

    dispatch({
      type: TYPES.CREATE_KANBAN_BOARD_SUCCESS,
      payload: { board: response.data.board }
    });
    enqueueSnackbar("Board created successfully", { variant: "success" });
  } catch (err) {
    dispatch({
      type: TYPES.CREATE_KANBAN_BOARD_FAIL,
      payload: { error: err?.response?.data?.message || "Something went wrong" }
    });
    enqueueSnackbar(err?.response?.data?.message || "Something went wrong", { variant: "error" });
  }
};

export const editKanbanBoard = (boardId, data, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.EDIT_KANBAN_BOARD_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.patch(`${API_URL}/admin/kanban/board/${boardId}`, data, options);

    dispatch({
      type: TYPES.EDIT_KANBAN_BOARD_SUCCESS,
      payload: { board: response.data.board, boardId }
    });
    enqueueSnackbar("Board updated successfully", { variant: "success" });
  } catch (err) {
    dispatch({
      type: TYPES.EDIT_KANBAN_BOARD_FAIL,
      payload: { error: err?.response?.data?.message || "Something went wrong" }
    });
    enqueueSnackbar(err?.response?.data?.message || "Something went wrong", { variant: "error" });
  }
};

export const deleteKanbanBoard = (boardId, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.DELETE_KANBAN_BOARD_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    await axios.delete(`${API_URL}/admin/kanban/board/${boardId}`, options);

    dispatch({
      type: TYPES.DELETE_KANBAN_BOARD_SUCCESS,
      payload: { boardId }
    });
    enqueueSnackbar("Board deleted successfully", { variant: "success" });
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_KANBAN_BOARD_FAIL,
      payload: { error: err?.response?.data?.message || "Something went wrong" }
    });
    enqueueSnackbar(err?.response?.data?.message || "Something went wrong", { variant: "error" });
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
