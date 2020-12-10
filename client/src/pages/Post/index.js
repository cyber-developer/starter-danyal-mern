import Spinner from 'components/formCommon/Spinner'
import PostItem from 'pages/Posts/Item'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from 'redux/action/postAction'
import CommentForm from './Form'
import CommentItem from './CommentItem'

function Post ({ match }) {
  const postt = useSelector(state => state.post)
  const { post, loading } = postt
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPost(match.params.id))
  }, [getPost])

  return loading || post === null ? (
    <Spinner />
  ) : (
    <div>
      <PostItem showAction={false} post={post} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </div>
  )
}

export default Post
