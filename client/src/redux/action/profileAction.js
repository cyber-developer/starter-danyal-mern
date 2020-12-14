import axios from 'axios'
import { setAlert } from './alertAction'
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  CLEAR_PROFILE
} from './types'
import { get, put, del, post } from 'services/restService'

// Get current profile
export const getCurrentProfile = () => async dispatch => {
  get('/api/profile/me').then(res => {
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  }).catch(error => {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error }
    })
  })
}

// get all profile

export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE })
  axios.get('/api/profile/').then(res => {
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  }).catch(error => {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  })
}

// get all profile by id

export const getProfileById = (userId) => async dispatch => {
  get(`/api/profile/user/${userId}`).then(res => {
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  }).catch(error => {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  })
}

// Create or update Profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  post('/api/profile', formData, config).then(res => {
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Profile Update' : 'Profile Created'))

    if (!edit) {
      history.push('/dashboard')
    }
  }).catch(error => {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  })
}

// ADD EXPERIENCE

export const addExperience = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  put('http://localhost:5000/api/profile/experience', formData, config).then(res => {
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('EXPERIENCE ADDDED'))

    history.push('/dashboard')
  }).catch(error => {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  })
}
