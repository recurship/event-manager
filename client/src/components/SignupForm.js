import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';

class SignupForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <Input
                    type="text"
                    placeholder="Full Name"
                    name="fullname"
                />
                <Input
                    type="text"
                    placeholder="User Name"
                    name="username"
                />
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                />

                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                />
                <Button type="submit">Sign Up </Button>
            </form>
        );
    }
}
export default SignupForm;