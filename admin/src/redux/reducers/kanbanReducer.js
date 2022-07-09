// Internal Import
import * as TYPES from "../types";

const initialState = {
  boards: [],
  boardList: [],
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

    case TYPES.GET_ALL_BOARD_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        boardList: payload.lists,
        error: null
      };

    case TYPES.CREATE_KANBAN_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        boardList: [...state.boardList, payload.list],
        error: null
      };

    case TYPES.UPDATE_KANBAN_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        boardList: state.boardList.map(list => {
          if (list._id === payload.list._id) {
            return {
              ...list,
              title: payload.list.title
            };
          }
          return list;
        })
      };

    case TYPES.DELETE_KANBAN_BOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        boards: state.boards.filter(board => board._id !== payload.boardId),
        error: null
      };

    case TYPES.MOVE_KANBAN_LIST_SUCCESS:
      const { boardId, listId } = payload.data;
      console.log(payload.data);
      const toIndex = payload.data.toIndex ? payload.data.toIndex : 0;

      let newBoardList = [...state.boardList];

      const list = newBoardList.find(list => list._id === listId);
      const listIndex = newBoardList.findIndex(list => list._id === listId);

      newBoardList.splice(listIndex, 1);
      newBoardList.splice(toIndex, 0, list);

      return {
        ...state,
        isLoading: false,
        boardList: [...newBoardList]
      };

    case TYPES.MOVE_KANBAN_CARD_SUCCESS:
      const { fromId, toId } = payload.data;
      const toIndexes = payload.data.toIndex ? payload.data.toIndex : 0;
      const cardId = payload.cardId;
      let newList = [...state.boardList];

      if (fromId === toId) {
        const list = newList.find(list => list._id === fromId);
        const listIndex = newList.findIndex(list => list._id === fromId);

        const card = list.cards.find(card => card._id === cardId);
        const cardIndex = list.cards.findIndex(card => card._id === cardId);

        list.cards.splice(cardIndex, 1);
        list.cards.splice(toIndexes.toIndex, 0, card);

        newList[listIndex] = list;
      } else {
        const fromList = newList.find(list => list._id === fromId);
        const fromListIndex = newList.findIndex(list => list._id === fromId);

        const toList = newList.find(list => list._id === toId);
        const toListIndex = newList.findIndex(list => list._id === toId);

        const card = fromList.cards.find(card => card._id === cardId);

        fromList.cards.splice(
          fromList.cards.findIndex(card => card._id === cardId),
          1
        );
        toList.cards.splice(toIndexes, 0, card);

        newList[fromListIndex] = fromList;
        newList[toListIndex] = toList;
      }

      return {
        ...state,
        isLoading: false,
        boardList: [...newList]
      };

    case TYPES.DELETE_KANBAN_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        boardList: state.boardList.filter(list => {
          console.log(list);
          console.log(payload.listId);
          return list._id !== payload.listId;
        })
      };

    case TYPES.CREATE_KANBAN_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        boardList: state.boardList.map(list => {
          if (list._id === payload.listId) {
            return {
              ...list,
              cards: [...list.cards, payload.card]
            };
          }
          return list;
        })
      };

    case TYPES.DELETE_KANBAN_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        boardList: state.boardList.map(list => {
          if (list._id === payload.listId) {
            return {
              ...list,
              cards: list.cards.filter(card => card._id !== payload.cardId)
            };
          }
          return list;
        })
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
