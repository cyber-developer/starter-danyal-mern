const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const auth = require('../../middleware/auth')
const postsController = require('../../controllers/postsController')

// post api/post create a post private

router.post('/', [auth, [
  check('text', 'Text is required').not().isEmpty()]], postsController.create_post)

// get api/posts get all post private
router.get('/', auth, postsController.get_all_post)

// get api/posts/:id get post by id
router.get('/:id', auth, postsController.get_post_by_id)

// delete api/post/:id delete post private
router.delete('/:id', auth, postsController.delete_post)

// put api/post/likes/:id like a post private
router.put('/like/:id', auth, postsController.like_post)

// put api/post/unlikes/:id unlike a post private
router.put('/unlike/:id', auth, postsController.unlike_post)

// post api/post create a comment private
router.post('/comment/:id', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], postsController.create_comment)

// delete api/posts/comments/:id/comment_id delete comment
router.delete('/comment/:id/:comment_id', auth, postsController.delete_comment)

module.exports = router
