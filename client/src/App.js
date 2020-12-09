import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import Landing from './components/layout/Landing'
import { Provider } from 'react-redux'
import store from './redux/store'
import Alert from './components/layout/Alert'
import { loadUser } from './redux/action/authAction'
import setAuthToken from './utils/setAuthToken'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import Profiles from './components/profiles/Profiles'
import PrivateRouting from './components/routing/PrivateRouting'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App () {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/profiles' component={Profiles} />
              <Route path='/create-profile' component={CreateProfile} />
              <Route path='/edit-profile' component={EditProfile} />
              <Route path='/add-experience' component={AddExperience} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  )
}

export default App
