import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router-dom';

import Login from '../Login/Login';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import AuthContainer from './AuthContainer';
import PrivateRoute from '../../components/PrivateRoute';

class App extends Component {
	render() {
		return (
			<div>
				<PrivateRoute exact path="/" component={AuthContainer} />
				<Route path="/login" component={Login} />
				<Route path="/forgot-password" component={ForgotPassword} />
			</div>
		);
	}
}

export default App;
