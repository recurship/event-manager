// @flow

import React, { Component } from 'react';
import './App.css';

import {
    Route
  } from 'react-router-dom'

import Login from '../Login/Login';
import AuthContainer from './AuthContainer';
import PrivateRoute from '../../components/PrivateRoute';

type Props = {};

class App extends Component<Props> { 
    render() {
        return (
            <div>
                <PrivateRoute path="/" component={AuthContainer} />
                <Route path="/login" component={Login} />
            </div>
        );
    }
}

export default App;
