import React from 'react';
import {
    Input,
    Button
} from 'reactstrap';

const LoginForm = ({ onSubmit }) => {
    return <form onSubmit={onSubmit}>
        <Input type="text" placeholder="Username" name="username" />
        <Input type="password" placeholder="Password" name="password" />
        <Button type="submit">Login</Button>
    </form>
}
 
export default LoginForm;