// Internal Import
import * as TYPES from "../types";

const initialState = {
  solutionsList: [],
  isLoading: false,
  error: null
};

export default function SolutionReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.ALL_SOLUTIONS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case TYPES.ALL_SOLUTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        solutionsList: payload.solutions,
        error: null
      };
    case TYPES.ALL_SOLUTIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };
    default:
      return state;
  }
}
