import React from 'react'
import PostForm from './Form'
import PostItem from './Item'

function List ({ posts }) {
  return (
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

export default List
