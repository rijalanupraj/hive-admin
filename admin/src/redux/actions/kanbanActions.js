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

export const getBoardById = boardId => async (dispatch, getState) => {
  dispatch({ type: TYPES.GET_BOARD_BY_ID_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/admin/kanban/board/${boardId}`, options);

    dispatch({
      type: TYPES.GET_BOARD_BY_ID_SUCCESS,
      payload: { board: response.data.board }
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_BOARD_BY_ID_FAIL,
      payload: { error: err?.response?.data?.message || "Something went wrong" }
    });
  }
};

export const getAllBoardList = boardId => async (dispatch, getState) => {
  dispatch({ type: TYPES.GET_ALL_BOARD_LIST_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/admin/kanban/boardlist/${boardId}`, options);

    dispatch({
      type: TYPES.GET_ALL_BOARD_LIST_SUCCESS,
      payload: { lists: response.data.lists }
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_ALL_BOARD_LIST_FAIL,

      payload: { error: err?.response?.data?.message || "Something went wrong" }
    });
  }
};

export const createKanbanList = (boardId, data, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.CREATE_KANBAN_LIST_LOADING });

  try {
    const options = attachTokenToHeaders(getState);

    const response = await axios.post(`${API_URL}/admin/kanban/list/${boardId}`, data, options);

    dispatch({
      type: TYPES.CREATE_KANBAN_LIST_SUCCESS,
      payload: { list: response.data.list, boardId }
    });
    enqueueSnackbar("List created successfully", { variant: "success" });
  } catch (err) {
    dispatch({
      type: TYPES.CREATE_KANBAN_LIST_FAIL,
      payload: { error: err?.response?.data?.message || "Something went wrong" }
    });
    enqueueSnackbar(err?.response?.data?.message || "Something went wrong", { variant: "error" });
  }
};

export const updateKanbanList = (listId, data, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.UPDATE_KANBAN_LIST_LOADING });

  try {
    const options = attachTokenToHeaders(getState);

    const response = await axios.patch(
      `${API_URL}/admin/kanban/list/rename/${listId}`,
      data,
      options
    );

    dispatch({
      type: TYPES.UPDATE_KANBAN_LIST_SUCCESS,
      payload: { list: response.data.list, listId }
    });
    enqueueSnackbar("List updated successfully", { variant: "success" });
  } catch (err) {
    dispatch({
      type: TYPES.UPDATE_KANBAN_LIST_FAIL,
      payload: { error: err?.response?.data?.message || "Something went wrong" }
    });
    enqueueSnackbar(err?.response?.data?.message || "Something went wrong", { variant: "error" });
  }
};

export const deleteKanbanList =
  (boardId, listId, enqueueSnackbar) => async (dispatch, getState) => {
    dispatch({ type: TYPES.DELETE_KANBAN_LIST_LOADING });

    try {
      const options = attachTokenToHeaders(getState);
      await axios.delete(`${API_URL}/admin/kanban/list/delete/${boardId}/${listId}`, options);

      dispatch({
        type: TYPES.DELETE_KANBAN_LIST_SUCCESS,
        payload: { listId }
      });
      enqueueSnackbar("List deleted successfully", { variant: "success" });
    } catch (err) {
      dispatch({
        type: TYPES.DELETE_KANBAN_LIST_FAIL,
        payload: { error: err?.response?.data?.message || "Something went wrong" }
      });
      enqueueSnackbar(err?.response?.data?.message || "Something went wrong", { variant: "error" });
    }
  };

export const createKanbanCard = (data, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.CREATE_KANBAN_CARD_LOADING });

  try {
    const options = attachTokenToHeaders(getState);

    const response = await axios.post(`${API_URL}/admin/kanban/card`, data, options);

    dispatch({
      type: TYPES.CREATE_KANBAN_CARD_SUCCESS,
      payload: { card: response.data.card, listId: data.listId }
    });
    enqueueSnackbar("Card created successfully", { variant: "success" });
  } catch (err) {
    dispatch({
      type: TYPES.CREATE_KANBAN_CARD_FAIL,
      payload: { error: err?.response?.data?.message || "Something went wrong" }
    });
    enqueueSnackbar(err?.response?.data?.message || "Something went wrong", { variant: "error" });
  }
};

export const deleteKanbanCard = (listId, cardId, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.DELETE_KANBAN_CARD_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    await axios.delete(`${API_URL}/admin/kanban/card/${listId}/${cardId}`, options);

    dispatch({
      type: TYPES.DELETE_KANBAN_CARD_SUCCESS,
      payload: { cardId, listId }
    });

    enqueueSnackbar("Card deleted successfully", { variant: "success" });
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_KANBAN_CARD_FAIL,
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
