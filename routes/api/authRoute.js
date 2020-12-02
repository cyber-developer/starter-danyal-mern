const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/UserModel')
const authController = require('../../controllers/authController')
// route get api/auth

router.get('/',auth,authController.getAuth);

// authenticate user and get token login
router.post('/',[ 
  check('email','please include a valid email').isEmail(),
  check('password','password is required').exists()
  ],authController.getTokenLogin);

module.exports =  router;