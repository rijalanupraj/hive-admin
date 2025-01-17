// Internal Import
import * as TYPES from "../types";

const initialState = {
  solutionsList: [],
  solutionReports: [],
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
    case TYPES.DELETE_SOLUTION_SUCCESS:
      const latestList = state.solutionsList.filter(
        solution => solution._id !== payload.solutionId
      );

      return {
        ...state,
        isLoading: false,
        solutionsList: latestList,
        error: null
      };

    case TYPES.HIDE_UNHIDE_SOLUTION_SUCCESS:
      let latestList1 = state.solutionsList.map(solution => {
        if (solution._id === payload.solutionId) {
          if (payload.isHide) {
            solution.isHide = true;
          } else {
            solution.isHide = false;
          }
        }
        return solution;
      });
      return {
        ...state,
        isLoading: false,
        solutionsList: latestList1,
        error: null
      };

    case TYPES.VIEW_REPORTED_SOLUTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        solutionReports: payload.reports
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
