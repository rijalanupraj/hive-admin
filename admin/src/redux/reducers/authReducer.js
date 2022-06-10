// Internal Import
import * as TYPES from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  me: null,
  error: null,
  appLoaded: false
};

export default function AuthReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.ME_LOADING:
      return {
        ...state,
        isLoading: true,
        appLoaded: false,
        error: null
      };
    case TYPES.LOGIN_WITH_EMAIL_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case TYPES.LOGIN_WITH_EMAIL_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: payload.token,
        me: payload.me,
        error: null
      };
    case TYPES.ME_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        me: payload.me,
        error: null,
        appLoaded: true
      };

    case TYPES.ME_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        me: null,
        error: null,
        appLoaded: true
      };

    case TYPES.LOGOUT_SUCCESS:
    case TYPES.LOGIN_WITH_EMAIL_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        me: null,
        isAuthenticated: false,
        isLoading: false,
        error: payload.error ? payload.error : null
      };
    default:
      return state;
  }
}
