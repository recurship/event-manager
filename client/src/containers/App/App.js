import React, { Component } from 'react';
import './App.css';

import {
    Route
  } from 'react-router-dom'

import Login from '../Login/Login';
import Signup from '../Signup/Signup'
import AuthContainer from './AuthContainer';
import PrivateRoute from '../../components/PrivateRoute';


class App extends Component {

    
    render() {
        return (
            <div>
                <PrivateRoute path="/" component={AuthContainer} />
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup} />
            </div>
        );
    }
}

export default App;
