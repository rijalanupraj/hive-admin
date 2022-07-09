// Internal Import
import * as TYPES from '../types'

const initialState = {
  badgeList: [],
  isLoading: false,
  error: null,
}

export default function BadgeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.ALL_BADGES_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case TYPES.ALL_BADGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        badgeList: payload.badges,
        error: null,
      }

    case TYPES.ADD_NEW_BADGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        badgeList: [...state.badgeList, payload.badge],
      }
    case TYPES.DELETE_BADGE_SUCCESS:
      const latestList = state.badgeList.filter(badge => badge._id !== payload.badgeId)

      return {
        ...state,
        isLoading: false,
        badgeList: latestList,
        error: null,
      }

    case TYPES.UPDATE_BADGE_SUCCESS:
      let updatedList = []
      updatedList = state.badgeList.map(badge => {
        if (badge._id === payload.badge._id) {
          return payload.badge
        }
        return badge
      })

      return {
        ...state,
        isLoading: false,
        categoryList: updatedList,
        error: null,
      }

    case TYPES.ALL_BADGES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      }
    default:
      return state
  }
}
