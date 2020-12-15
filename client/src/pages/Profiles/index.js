import Spinner from 'components/formCommon/Spinner'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProfiles } from 'redux/action/profileAction'
import ProfileItem from './Item'
import List from './List'

const Profiles = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfiles())
  }, [])

  const rprofile = useSelector(state => state.profile)
  const { profiles, loading } = rprofile

  return (
    <>
      {loading ? <Spinner /> : 
        <List profiles={profiles} />
      }
    </>
  )
}

export default Profiles
