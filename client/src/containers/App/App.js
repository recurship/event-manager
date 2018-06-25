import React, { Component } from 'react';
import './App.css';

import {
    Route
  } from 'react-router-dom'

import Login from '../Login';
import AuthContainer from './AuthContainer';
import PrivateRoute from '../../components/PrivateRoute';


class App extends Component {

    
    render() {
        return (
            <div>
                <PrivateRoute path="/" component={AuthContainer} />
                <Route path="/login" component={Login}/>
            </div>
        );
    }
}

export default App;
