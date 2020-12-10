import React from 'react'
import Moment from 'react-moment'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addLike, removeLike, deletePost } from 'redux/action/postAction'
import SubmitButton from 'components/formCommon/SubmitButton'

function PostItem ({ post: { _id, text, name, avatar, user, likes, comments, date }, showAction = true }) {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link>
          <img
            className='round-img'
            src={avatar}
            alt=''
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>
          {text}
        </p>
        <p className='post-date'>
          Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
          {'    '} <span>{moment(date).fromNow(true)}{' '}ago</span>
        </p>
        {showAction && <>
          <button type='button' className='btn btn-light' onClick={() => dispatch(addLike(_id))}>
            <i className='fas fa-thumbs-up' />
            {likes.length > 0 && (
              <span>{' '}{likes.length}</span>
            )}
          </button>
          <button type='button' className='btn btn-light' onClick={() => dispatch(removeLike(_id))}>
            <i className='fas fa-thumbs-down' />
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Discussion {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
          )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <SubmitButton onClick={() => dispatch(deletePost(_id))} />
          )}
        </>}

      </div>
    </div>
  )
}

export default PostItem
