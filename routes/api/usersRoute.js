const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const userController = require('../../controllers/userController')

// route post api/users
router.post('/', [
  check('name', 'name is required').not().isEmpty(),
  check('email', 'please include a valid email').isEmail(),
  check('password', 'please enter a password with 6 or more character').isLength({ min: 6 })
], userController.create_user
)

module.exports = router
