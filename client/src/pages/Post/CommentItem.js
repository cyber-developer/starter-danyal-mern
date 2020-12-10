import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Moment from 'react-moment'
import moment from 'moment'
import { deleteComment } from 'redux/action/postAction'
import SubmitButton from 'components/formCommon/SubmitButton'

function CommentItem ({ postId, comment: { _id, text, name, avatar, user, date } }) {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

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

        {!auth.loading && user === auth.user._id && (
          <SubmitButton onClick={() => dispatch(deleteComment(_id, postId))} />
        )}
      </div>
    </div>
  )
}

export default CommentItem
