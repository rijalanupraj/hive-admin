// External Import
import axios from 'axios'

// Internal Import
import * as TYPES from '../types'
import { BACKEND_API_URL } from '../../constants'

const API_URL = BACKEND_API_URL

export const getAllBadges = navigate => async (dispatch, getState) => {
  dispatch({ type: TYPES.ALL_BADGES_LOADING })

  try {
    const options = attachTokenToHeaders(getState)
    const response = await axios.get(`${API_URL}/admin/badge/viewallbadges`, options)

    dispatch({
      type: TYPES.ALL_BADGES_SUCCESS,
      payload: { badges: response.data.badges },
    })
  } catch (err) {
    dispatch({
      type: TYPES.ALL_BADGES_FAIL,
      payload: { error: err.response.data.message },
    })
  }
}

export const addNewBadge = (badge, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.ADD_NEW_BADGE_LOADING })

  try {
    const options = attachTokenToHeaders(getState)
    // Form Data in headers
    options.headers['Content-Type'] = 'multipart/form-data'

    const response = await axios.post(`${API_URL}/admin/badge/add`, badge, options)

    dispatch({
      type: TYPES.ADD_NEW_BADGE_SUCCESS,
      payload: { badge: response.data.badge },
    })
    enqueueSnackbar('Badge added successfully', { variant: 'success' })
  } catch (err) {
    dispatch({
      type: TYPES.ADD_NEW_BADGE_FAIL,
      payload: { error: err.response.data.message },
    })
    enqueueSnackbar(err?.response?.data?.message || 'Something went wrong. Please try again later')
  }
}

export const updateBadge = (id, badgeData, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.UPDATE_BADGE_LOADING })

  try {
    const options = attachTokenToHeaders(getState)
    options.headers['Content-Type'] = 'multipart/form-data'
    const response = await axios.put(`${API_URL}/admin/badge/update/${id}`, badgeData, options)

    dispatch({
      type: TYPES.UPDATE_BADGE_SUCCESS,
      payload: { badge: response.data.badge },
    })
    enqueueSnackbar('Badge updated successfully', {
      variant: 'success',
    })
  } catch (err) {
    dispatch({
      type: TYPES.UPDATE_BADGE_FAIL,
      payload: { error: err.response.data.message },
    })
    if (err?.response?.data?.message.includes('duplicate')) {
      enqueueSnackbar('Badge already exists', { variant: 'error' })
    } else {
      enqueueSnackbar(err?.response?.data?.message || 'Something went wrong. Please try again later')
    }
  }
}

export const deleteBadge = (badgeId, enqueueSnackbar) => async (dispatch, getState) => {
  dispatch({ type: TYPES.DELETE_BADGE_LOADING })

  try {
    const options = attachTokenToHeaders(getState)

    await axios.delete(`${API_URL}/admin/badge/delete/${badgeId}`, options)

    dispatch({
      type: TYPES.DELETE_BADGE_SUCCESS,
      payload: { badgeId: badgeId },
    })
    if (enqueueSnackbar) {
      enqueueSnackbar('Badge deleted successfully', { variant: 'success' })
    }
  } catch (err) {
    dispatch({
      type: TYPES.DELETE_BADGE_FAIL,
      payload: { error: err.response.data.message },
    })
    enqueueSnackbar('Badge deletion failed', { variant: 'error' })
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
