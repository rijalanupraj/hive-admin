// External Import
import axios from 'axios'

// Internal Import
import * as TYPES from '../types'
import { BACKEND_API_URL } from '../../constants'

const API_URL = BACKEND_API_URL

export const getSystemAnalytics = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.GET_SYSTEM_ANALYTICS_LOADING })

  try {
    const options = attachTokenToHeaders(getState)
    const response = await axios.get(`${API_URL}/admin/analytics/system-analytics`, options)

    dispatch({
      type: TYPES.GET_SYSTEM_ANALYTICS_SUCCESS,
      payload: { stats: response.data },
    })
  } catch (err) {
    dispatch({
      type: TYPES.GET_SYSTEM_ANALYTICS_FAIL,
      payload: { error: err.response.data.message },
    })
  }
}

export const attachTokenToHeaders = getState => {
  const token = getState().auth.token

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  }

  if (token) {
    config.headers['x-auth-token'] = token
  }

  return config
}
