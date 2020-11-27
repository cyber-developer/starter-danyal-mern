const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const bcrypt=require('bcryptjs');
 const jwt=require('jsonwebtoken');
 const config =require('config');
const auth= require('../../middleware/auth');
const User = require('../../models/User')
// route get api/auth

router.get('/',auth,async (req,res)=>{
    try {
        const user =await User.findById(req.user.id).select('-password');

        if(!user)
            res.status(404).send('user not found')

        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

// authenticate user and get token login
router.post('/',[
    
    check('email','please include a valid email').isEmail(),
    check('password','password is required').exists()
   ],
   async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email,password} =req.body;
    try {
     //see if user exist
     let user =await User.findOne({email});

     if(!user){
         return res.status(400).json({errors:[{msg:'Invalid credential'}] })
     }

     const isMatch =await bcrypt.compare(password,user.password);
     if(!isMatch){
        return res.status(400).json({errors:[{msg:'Invalid credential'}] });
     }

     //return jsonwebtoken
      const payload={
          user:{
              id:user.id
          }
      }

      jwt.sign(payload,config.get('jwtToken'),
          {expiresIn:360000},
          (error,token) => {
          if(error) throw error;
          res.json({token});
      }
      )
      
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
   
});

module.exports=router;