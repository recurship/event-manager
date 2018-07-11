import React, { Component } from 'react';
import { Container } from 'reactstrap';
import SignupForm from '../../components/SignUp/SignupForm';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignup } from '../../actions/index';
import PropTypes from 'prop-types';

class Signup extends Component {
	signup = e => {
		e.preventDefault();
		const { username, fullname, email, password } = e.target.elements,
			{ dispatch } = this.props,
			payload = {
				username: username.value,
				fullname: fullname.value,
				email: email.value,
				password: password.value,
			};
		dispatch(userSignup(payload));
	};

	render() {
		return this.props.userState.token === null ? (
			<Container className="login-container">
				<h4>Sign Up</h4>
				<hr />
				<SignupForm onSubmit={this.signup} />
				<hr />
				<p className="centralized">
					Already have an account? <Link to="/login">Login</Link>
				</p>
			</Container>
		) : (
			<Redirect to={{ pathname: '/' }} />
		);
	}
}

const mapStateToProps = state => ({ userState: { ...state.userState } });

export default connect(mapStateToProps)(Signup);
