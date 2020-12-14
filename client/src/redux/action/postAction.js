import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from '../action/types'
import axios from 'axios'
import { setAlert } from './alertAction'
import { get, put, del, post } from 'services/restService'

// Get Posts
export const getPosts = () => async dispatch => {
  get('/api/posts').then(res => {
    console.log(res)
    dispatch({
      type: GET_POSTS,
      payload: res
    })
  }).catch(error => {
    console.log(error)
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  })
}

// add like
export const addLike = (postId) => async dispatch => {
  put(`/api/posts/like/${postId}`).then(res => {
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    })
  }).catch(error => {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error }
    })
  })
}

// remove unlikelike
export const removeLike = (postId) => async dispatch => {
  put(`/api/posts/unlike/${postId}`).then(res => {
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    })
  }).catch(error => {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error }
    })
  })
}

// remove post
export const deletePost = (postId) => async dispatch => {
  del(`/api/posts/${postId}`).then(res => {
    dispatch({
      type: DELETE_POST,
      payload: postId
    })

    dispatch(setAlert('Post Removed'))
  }).catch(error => {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error }
    })
  })
}

// ADD POST
export const addPost = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  post('/api/posts', formData, config).then(res => {
    dispatch({
      type: ADD_POST,
      payload: res.data
    })

    dispatch(setAlert('Post Addded'))
  }).catch(error => {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error }
    })
  })
}

// Get Posts
export const getPost = (postId) => async dispatch => {
  get(`/api/posts/${postId}`).then(res => {
    console.log(res)
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  }).catch(error => {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.message }
    })
  })
}

// ADD COMMENT
export const addComment = (formData, postId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  post(`/api/posts/comment/${postId}`, formData, config).then(res => {
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })

    dispatch(setAlert('Comment Addded'))
  }).catch(error => {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error }
    })
  })
}

// Delete COMMENT
export const deleteComment = (commentId, postId) => async dispatch => {
  del(`/api/posts/comment/${postId}/${commentId}`).then(res => {
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    })

    dispatch(setAlert('Comment Removed'))
  }).catch(error => {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  })
}
