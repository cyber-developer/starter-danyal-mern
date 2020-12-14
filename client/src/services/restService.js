import axios from 'axios'

const REQUEST_URL = process.env.REACT_APP_BASE_URL

export const get = (url, config = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(`${REQUEST_URL}${url}`).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export const post = (url, config = {}, data) => {
  return new Promise((resolve, reject) => {
    axios.post(`${REQUEST_URL}${url}`, data, config).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export const put = (url, config = {}) => {
  return new Promise((resolve, reject) => {
    axios.put(`${REQUEST_URL}${url}`).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export const del = (url, config = {}) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${REQUEST_URL}${url}`).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
