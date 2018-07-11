import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './SignupFormValidator';
import renderField from '../RenderField';
import './SignupForm.css';

let SignupForm = props => {
	const { onSubmit, valid } = props;
	return (
		<form id="signup-form" onSubmit={onSubmit}>
			<Field
				name="fullname"
				className="form-control"
				placeholder="Full Name"
				component={renderField}
			/>

			<Field
				type="text"
				placeholder="User Name"
				className="form-control"
				name="username"
				component={renderField}
			/>

			<Field
				type="email"
				placeholder="Email"
				className="form-control"
				name="email"
				component={renderField}
			/>

			<Field
				type="password"
				placeholder="Password"
				className="form-control"
				name="password"
				component={renderField}
			/>
			<input
				className="btn btn-dark"
				type="submit"
				disabled={!valid}
				value="Sign Up"
			/>
		</form>
	);
};

SignupForm = reduxForm({
	form: 'signup',
	validate,
})(SignupForm);

export default SignupForm;
