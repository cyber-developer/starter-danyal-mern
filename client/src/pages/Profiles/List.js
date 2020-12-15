import React from 'react'

const List = ({profiles}) => {
  return (
    <>
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
      </>
  )
}

export default List
