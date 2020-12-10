import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from 'redux/action/authAction'

function Navbar () {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const authLinks = (
    <ul>
      <li><Link to='/profiles'>Developers</Link></li>
      <li><Link to='/posts'>Posts</Link></li>
      <li><Link to='/dashboard'><i className='fas fa-user' />{' '}Dashboard</Link></li>
      <li>
        <Link onClick={() => dispatch(logout())} to='/'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>

    </ul>
  )
  const guestLinks = (
    <ul>
      <li><Link to='/profiles'>Developers</Link></li>
      <li><Link to='/register'>Register</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </ul>
  )

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'><i className='fas fa-code' />DevConnector</Link>
      </h1>
      {!auth.loading && (<>{auth.isAuthenticated ? authLinks : guestLinks}</>)}
    </nav>
  )
}

export default Navbar
