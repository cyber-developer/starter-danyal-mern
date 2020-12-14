import Spinner from 'components/formCommon/Spinner'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from 'redux/action/postAction'
import List from './List'

function Posts () {
  const post = useSelector(state => state.post)
  const { posts, loading } = post
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return loading ? (
    <Spinner />
  ) : (
    <List posts={posts} />
  )
}

export default Posts
