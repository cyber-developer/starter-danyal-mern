import {Fragment,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import Landing from './components/layout/Landing'
import {Provider} from 'react-redux';
import store from './redux/store'
import Alert from './components/layout/Alert';
import {loadUser} from './redux/action/auth';
import setAuthToken from './utils/setAuthToken'

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {

  useEffect(()=>{
    
    store.dispatch(loadUser());
    
  },[])

  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar/>
        <Route exact path='/' component={Landing}/>
          <section className="container">
            <Alert/>
            <Switch>
              <Route  path='/register' component={Register}/>
              <Route  path='/login' component={Login}/>
              <Route  path='/dashboard' component={Dashboard}/>
            </Switch>
          </section>
      </Fragment>
    </Router>
  </Provider>
  );
}

export default App;
