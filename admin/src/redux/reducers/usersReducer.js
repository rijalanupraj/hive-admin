// Internal Import
import * as TYPES from "../types";

const initialState = {
  usersList: [],
  adminsList: [],
  isLoading: false,
  error: null,
  createAdminError: null,
};

export default function UsersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.ALL_USERS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case TYPES.ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersList: payload.users,
        error: null,
      };
    case TYPES.ALL_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminsList: payload.admins,
        error: null,
      };

    case TYPES.DELETE_ADMIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminsList: state.adminsList.filter(
          (admin) => admin._id !== payload.adminId
        ),
        error: null,
      };

    case TYPES.DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersList: state.usersList.filter(
          (user) => user._id !== payload.userId
        ),
        error: null,
      };

    case TYPES.CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminsList: [...state.adminsList, payload.admin],
        error: null,
      };

    case TYPES.CREATE_ADMIN_FAIL:
      return {
        ...state,
        isLoading: false,
        createAdminError: payload.error,
      };

    case TYPES.ALL_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    default:
      return state;
  }
}
