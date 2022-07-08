// Internal Import
import * as TYPES from '../types'

const initialState = {
  isLoading: false,
  error: null,
  stats: null,
}

export default function DashboardReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.GET_SYSTEM_ANALYTICS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case TYPES.GET_SYSTEM_ANALYTICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stats: payload.stats,
        error: null,
      }

    case TYPES.GET_SYSTEM_ANALYTICS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      }

    default:
      return state
  }
}
