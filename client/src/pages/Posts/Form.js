import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPost } from 'redux/action/postAction'

function PostForm () {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1' onSubmit={(e) => {
          e.preventDefault()
          dispatch(addPost({ text }))
          setText('')
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          required
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}

export default PostForm
