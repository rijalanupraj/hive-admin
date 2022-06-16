// Internal Import
import * as TYPES from "../types";

const initialState = {
  questionsList: [],
  isLoading: false,
  error: null
};

export default function QuestionReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.ALL_QUESTIONS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case TYPES.ALL_QUESTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questionsList: payload.questions,
        error: null
      };

    case TYPES.DELETE_QUESTION_SUCCESS:
      const latestList = state.questionsList.filter(
        question => question._id !== payload.questionId
      );

      return {
        ...state,
        isLoading: false,
        questionsList: latestList,
        error: null
      };

    case TYPES.ALL_QUESTIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };
    default:
      return state;
  }
}
