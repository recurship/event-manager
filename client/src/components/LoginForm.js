// @flow

import React from 'react';
import { Input, Button } from 'reactstrap';
import './LoginForm.css';

type Props = {
	onSubmit(e: any): void,
};

const LoginForm = ({ onSubmit }: Props) => {
	return (
		<form id="login-form" onSubmit={onSubmit}>
			<Input type="text" placeholder="Username" name="username" />
			<Input type="password" placeholder="Password" name="password" />
			<Button type="submit">Login</Button>
		</form>
	);
};

export default LoginForm;
