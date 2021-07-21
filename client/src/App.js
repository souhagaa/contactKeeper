import React, { Fragment } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import ContactState from './context/contact/contactState'
import AuthState from './context/auth/authState'


const App = () => {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <Fragment>
            <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ContactState>
    </AuthState>
  );
}

export default App;
