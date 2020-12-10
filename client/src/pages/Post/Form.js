import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from 'redux/action/postAction'

function CommentForm ({ postId }) {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <form
        className='form my-1' onSubmit={(e) => {
          e.preventDefault()
          dispatch(addComment({ text }, postId))
          setText('')
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a Comment'
          required
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input type='submit' className='btn btn-dark my-1' value='Add Comment' />
      </form>
    </div>
  )
}

export default CommentForm
