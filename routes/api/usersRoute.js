const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const gravatar = require('gravatar');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config =require('config');
const userController = require('../../controllers/userController');
 
const User =require('../../models/UserModel');
const { JsonWebTokenError } = require('jsonwebtoken');

// route post api/users
router.post('/',[
     check('name','name is required').not().isEmpty() ,
     check('email','please include a valid email').isEmail(),
     check('password','please enter a password with 6 or more character').isLength({min:6})
    ],userController.create_user
);

 module.exports=router;