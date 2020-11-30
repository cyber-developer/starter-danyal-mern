import React from 'react'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {useDipatch,useSelector} from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

const dispatch = useDipatch();
const user = useSelector(state => state.auth)
const profile = useSelector(state => state.profile)

function Dashboard() {

  useEffect(() => {
     dispatch(getCurrentProfile);
  }, [input])
  let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>;
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
    )
}

export default Dashboard
