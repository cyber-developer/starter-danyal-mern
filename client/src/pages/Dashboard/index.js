import Spinner from 'components/formCommon/Spinner'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { getCurrentProfile } from 'redux/action/profileAction'
import DashboardAction from './Action'

function Dashboard () {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const rprofile = useSelector(state => state.profile)

  const { profile, loading } = rprofile
  const { user } = auth

  useEffect(() => {
    dispatch(getCurrentProfile())
  }, [])

  if (!auth.isAuthenticated) {
    return <Redirect to='/login' />
  }

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <><DashboardAction /></>
      ) : (
        <>
          <p>You have not set up a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>create profile</Link>
        </>
      )}
    </>
  )
}

export default Dashboard
