import Spinner from 'components/formCommon/Spinner'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProfiles } from 'redux/action/profileAction'
import ProfileItem from './Item'

const Profiles = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfiles())
  }, [])

  const rprofile = useSelector(state => state.profile)
  const { profiles, loading } = rprofile

  return (
    <>
      {loading ? <Spinner /> : <>
        <h1 className='large text-primary'>Developers</h1>
        <p className='lead'>
          <i className='fab fa-connectdevelop' /> Browse and connect with developers
        </p>
        <div className='profiles'>
          {profiles && profiles.length > 0 ? (
            profiles.map(profile => (
              <ProfileItem key={profile.id} profile={profile} />
            ))
          ) : <h4>No Profiles found...</h4>}
        </div>
      </>}
    </>
  )
}

export default Profiles
