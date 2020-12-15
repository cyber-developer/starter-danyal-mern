import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE } from './types'
import { setAlert } from './alertAction'
import setAuthToken from 'utils/setAuthToken'
import { get, put, del, post } from 'services/restService'

// LOAD USER
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  get('http://localhost:5000/api/auth').then(res => {
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  }).catch(error => {
    dispatch({
      type: AUTH_ERROR
    })
  })
}

// REGISTER USER
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ name, email, password })
  
  post('http://localhost:5000/api/users', body, config).then(res => {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())

    dispatch(setAlert('successful registered', 'danger'))
  }).catch(error => {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  })
}

// Login USER
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ email, password })
  post('http://localhost:5000/api/auth', body, config).then(res => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  }).catch(error => {
    console.log(error)
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  })
}

// Logout / Clear
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE })
  dispatch({ type: LOGOUT })
}
