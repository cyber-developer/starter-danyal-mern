import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/Dashboard'
import Landing from './components/layout/Landing'
import { Provider } from 'react-redux'
import store from './redux/store'
import Alert from './components/layout/Alert'
import { loadUser } from './redux/action/authAction'
import setAuthToken from './utils/setAuthToken'
import CreateProfile from './pages/Profile-forms/CreateProfile'
import EditProfile from './pages/Profile-forms/EditProfile'
import AddExperience from './pages/Profile-forms/AddExperience'
import Profiles from './pages/Profiles'
import PrivateRoute from './routing/PrivateRouting'
import Posts from 'pages/Posts'
import Post from 'pages/Post'
import NotFound from 'components/layout/NotFound'

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
          <Switch>
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/profiles' component={Profiles} />
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
              <Route component={NotFound} />
            </Switch>
          </section>
          </Switch>
        </>
      </Router>
    </Provider>
  )
}

export default App
