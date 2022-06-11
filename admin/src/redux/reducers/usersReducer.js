// Internal Import
import * as TYPES from "../types";

const initialState = {
  usersList: [],
  isLoading: false,
  error: null
};

export default function UsersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.ALL_USERS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case TYPES.ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersList: payload.users,
        error: null
      };
    case TYPES.ALL_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };
    default:
      return state;
  }
}
