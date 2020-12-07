import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS } from './types'
import { setAlert } from './alertAction'
import setAuthToken from 'utils/setAuthToken'

// LOAD USER
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('http://localhost:5000/api/auth')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// REGISTER USER
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ name, email, password })
  try {
    const res = await axios.post('http://localhost:5000/api/users', body, config)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
    dispatch(setAlert('successful registered', 'danger'))
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Login USER
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ email, password })
  try {
    const res = await axios.post('http://localhost:5000/api/auth', body, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}
