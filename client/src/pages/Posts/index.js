import Spinner from 'components/formCommon/Spinner'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from 'redux/action/postAction'
import PostForm from './Form'
import PostItem from './Item'

function Posts () {
  const post = useSelector(state => state.post)
  const { posts, loading } = post
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [getPosts])
  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>
        Posts
      </h1>
      <p className='lead'><i className='fas fa-user' /> Welcome to the community!</p>

      <PostForm />

      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  )
}

export default Posts
