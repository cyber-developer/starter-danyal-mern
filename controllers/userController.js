const { validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/UserModel')

exports.create_user = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { name, email, password } = req.body
  try {
    // see if user exist
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User Already Exists' }] })
    }
    // get user gravatar
    const avatar = gravatar.url(email,
      {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
    user = new User(
      {
        name,
        email,
        avatar,
        password
      })
    // encrypt password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()
    // return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtToken'),
      { expiresIn: 360000 },
      (error, token) => {
        if (error) throw error
        res.json({ token })
      }
    )
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server error')
  }
}
