import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

function PrivateRouting ({ component: Component, ...rest }) {
  const auth = useSelector(state => state.auth)
  return (
    <Route
      {...rest}
      render={props => auth.isAuthenticated && !auth.loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )}
    />
  )
}

export default PrivateRouting
