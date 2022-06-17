// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const getAllCategories = navigate => async (dispatch, getState) => {
  dispatch({ type: TYPES.ALL_CATEGORIES_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/admin/category`, options);

    dispatch({
      type: TYPES.ALL_CATEGORIES_SUCCESS,
      payload: { categories: response.data.categories }
    });
  } catch (err) {
    dispatch({
      type: TYPES.ALL_CATEGORIES_SUCCESS,
      payload: { error: err.response.data.message }
    });
  }
};

export const addNewCategory = category => async (dispatch, getState) => {
  dispatch({ type: TYPES.ADD_NEW_CATEGORY_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(`${API_URL}/admin/category/add`, category, options);

    dispatch({
      type: TYPES.ADD_NEW_CATEGORY_SUCCESS,
      payload: { category: response.data.category }
    });
  } catch (err) {
    dispatch({
      type: TYPES.ADD_NEW_CATEGORY_FAIL,
      payload: { error: err.response.data.message }
    });
  }
};

export const updateCategory = (id, categoryData) => async (dispatch, getState) => {
  dispatch({ type: TYPES.UPDATE_CATEGORY_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(
      `${API_URL}/admin/category/update/${id}`,
      categoryData,
      options
    );

    dispatch({
      type: TYPES.UPDATE_CATEGORY_SUCCESS,
      payload: { category: response.data.category }
    });
  } catch (err) {
    dispatch({
      type: TYPES.UPDATE_CATEGORY_FAIL,
      payload: { error: err.response.data.message }
    });
  }
};

export const deleteCategory = (categoryId, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.DELETE_CATEGORY_LOADING });

  try {
    const options = attachTokenToHeaders(getState);

    await axios.delete(`${API_URL}/admin/category/delete/${categoryId}`, options);

    dispatch({
      type: TYPES.DELETE_CATEGORY_SUCCESS,
      payload: { categoryId: categoryId }
    });
    if (enqueueSnackbar) {
      enqueueSnackbar("Category deleted successfully", { variant: "success" });
    }
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_CATEGORY_FAIL,
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
