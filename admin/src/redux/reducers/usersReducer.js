// Internal Import
import * as TYPES from "../types";

const initialState = {
  usersList: [],
  adminsList: [],
  userReports: [],
  userRequests: [],
  isLoading: false,
  error: null,
  createAdminError: null
};

export default function UsersReducer(state = initialState, { type, payload }) {
  let updatedRequests;
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
    case TYPES.ALL_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminsList: payload.admins,
        error: null
      };

    case TYPES.DELETE_ADMIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminsList: state.adminsList.filter(admin => admin._id !== payload.adminId),
        error: null
      };

    case TYPES.DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersList: state.usersList.filter(user => user._id !== payload.userId),
        error: null
      };

    case TYPES.CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminsList: [...state.adminsList, payload.admin],
        error: null
      };

    case TYPES.BAN_TOGGLE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersList: state.usersList.map(user => {
          if (user._id === payload.userId) {
            return {
              ...user,
              isBanned: !user.isBanned
            };
          }
          return user;
        }),
        error: null
      };

    case TYPES.VIEW_REPORTED_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userReports: payload.reports
      };

    case TYPES.GET_ALL_VERIFICATION_REQUESTS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case TYPES.GET_ALL_VERIFICATION_REQUESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userRequests: payload.requests,
        error: null
      };

    case TYPES.GET_ALL_VERIFICATION_REQUESTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };

    case TYPES.ACCEPT_VERIFICATION_REQUEST_SUCCESS:
      updatedRequests = state.userRequests.map(request => {
        if (request._id === payload.requestId) {
          return {
            ...request,
            status: "Approved"
          };
        }
        return request;
      });

      return {
        ...state,
        isLoading: false,
        userRequests: updatedRequests,
        error: null
      };

    case TYPES.REJECT_VERIFICATION_REQUEST_SUCCESS:
      updatedRequests = state.userRequests.map(request => {
        if (request._id === payload.requestId) {
          return {
            ...request,
            status: "Rejected"
          };
        }
        return request;
      });

      return {
        ...state,
        isLoading: false,
        userRequests: updatedRequests,
        error: null
      };

    case TYPES.VERIFY_USER_TOGGLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersList: state.usersList.map(user => {
          if (user._id === payload.userId) {
            return {
              ...user,
              isVerified: payload.isVerified
            };
          }
          return user;
        }),
        error: null
      };

    case TYPES.CREATE_ADMIN_FAIL:
      return {
        ...state,
        isLoading: false,
        createAdminError: payload.error
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
