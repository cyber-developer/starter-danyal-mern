import React from 'react';
import useSelector from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

const auth = useSelector(state=>state.auth);
function PrivateRoute({component: Component,...rest}){
   return(
    <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
   )
}





export default PrivateRoute;
