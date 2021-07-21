import React, { Fragment } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Alerts from './components/layout/Alerts'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'


import ContactState from './context/contact/contactState'
import AuthState from './context/auth/authState'
import AlertState from './context/alert/alertState'


const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar/>
              <div className="container">
                <Alerts/>
                <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route exact path='/about' component={About}/>
                  <Route exact path='/register' component={Register}/>
                  <Route exact path='/login' component={Login}/>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
