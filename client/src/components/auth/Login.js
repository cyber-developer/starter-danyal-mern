import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from 'redux/action/authAction'

function Login () {
  const dispatch = useDispatch()
  const [formData, setFromData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData
  const onChange = e => setFromData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = async e => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }
  return (
    <>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'><i className='fas fa-user' /> Sign into Your Account</p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => onChange(e)}
            name='password'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </>
  )
}

export default Login
