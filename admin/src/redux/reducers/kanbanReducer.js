// Internal Import
import * as TYPES from "../types";

const initialState = {
  boards: [],
  isLoading: false,
  error: null,
  board: null
};

export default function KanbanReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.GET_ALL_KANBAN_BOARDS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case TYPES.GET_ALL_KANBAN_BOARDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        boards: payload.boards,
        error: null
      };

    case TYPES.CREATE_KANBAN_BOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        boards: [...state.boards, payload.board],
        error: null
      };

    case TYPES.EDIT_KANBAN_BOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        boards: state.boards.map(board => {
          if (board._id === payload.board._id) {
            return payload.board;
          }
          return board;
        }),
        error: null
      };

    case TYPES.GET_BOARD_BY_ID_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case TYPES.GET_BOARD_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        board: payload.board,
        error: null
      };

    case TYPES.GET_ALL_KANBAN_BOARDS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };

    case TYPES.GET_BOARD_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };

    case TYPES.EDIT_KANBAN_BOARD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };

    default:
      return state;
  }
}
