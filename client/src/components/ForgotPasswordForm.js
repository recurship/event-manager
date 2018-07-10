import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';

const ForgotPasswordForm = props => {
	return (
		<form id="forgot-password" onSubmit={props.onSubmit}>
			<div className="form-group">
				<h6>Enter your email address to reset your password.</h6>
				<Input type="email" name="email" placeholder="Type your Email" />
			</div>
			<div>
				<Button type="submit" className="btn btn-warning text-right">
					Reset Password
				</Button>
			</div>
		</form>
	);
};

export default ForgotPasswordForm;
