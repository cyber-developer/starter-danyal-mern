import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from '../action/types'
import axios from 'axios'
import { setAlert } from './alertAction'

// Get Posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/posts')

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// add like
export const addLike = (postId) => async dispatch => {
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/like/${postId}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// remove unlikelike
export const removeLike = (postId) => async dispatch => {
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/unlike/${postId}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// remove post
export const deletePost = (postId) => async dispatch => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/posts/${postId}`)

    dispatch({
      type: DELETE_POST,
      payload: postId
    })
    dispatch(setAlert('Post Removed'))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}
// ADD POST
export const addPost = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('http://localhost:5000/api/posts', formData, config)

    dispatch({
      type: ADD_POST,
      payload: res.data
    })
    dispatch(setAlert('Post Addded'))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// Get Posts
export const getPost = (postId) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${postId}`)

    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// ADD COMMENT
export const addComment = (formData, postId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`http://localhost:5000/api/posts/comment/${postId}`, formData, config)

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })
    dispatch(setAlert('Comment Addded'))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// Delete COMMENT
export const deleteComment = (commentId, postId) => async dispatch => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`)

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    })
    dispatch(setAlert('Comment Removed'))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}
