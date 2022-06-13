// Internal Import
import * as TYPES from "../types";

const initialState = {
  categoryList: [],
  isLoading: false,
  error: null,
};

export default function CategoryReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case TYPES.ALL_CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case TYPES.ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryList: payload.categories,
        error: null,
      };

    case TYPES.ADD_NEW_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryList: [...state.categoryList, payload.category],
      };
    case TYPES.DELETE_CATEGORY_SUCCESS:
      const latestList = state.categoryList.filter(
        (category) => category._id !== payload.categoryId
      );

      return {
        ...state,
        isLoading: false,
        categoryList: latestList,
        error: null,
      };

    case TYPES.ALL_CATEGORIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    default:
      return state;
  }
}
