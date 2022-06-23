// Internal Import
import * as TYPES from "../types";

const initialState = {
  comments: [],
  isLoading: false,
  error: null
};

export default function CommentReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.GET_ALL_COMMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case TYPES.GET_ALL_COMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: payload.comments,
        error: null
      };

    case TYPES.DELETE_COMMENT_SUCCESS:
      const latestList = state.comments.filter(comment => comment._id !== payload.commentId);
      return {
        ...state,
        isLoading: false,
        comments: latestList,
        error: null
      };

    case TYPES.GET_ALL_COMMENTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };
    default:
      return state;
  }
}
