// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../../actions';
import { Redirect } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { Container } from 'reactstrap';
import './Login.css';

type Props = {
    userState: Object,
    dispatch: Function
};

class Login extends Component<Props> {

    login = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;

        // admin / 1299459ML
        dispatch(userLogin({ 
            username: e.target.elements.username.value, 
            password: e.target.elements.password.value 
        }));
    }

    render() { 
        return ((this.props.userState.token === null) ? 
            <Container className="login-container">
                <h4>Login</h4>
                <LoginForm onSubmit={this.login} /> 
            </Container> :
            <Redirect to={{
                pathname: '/',
            }}/>);
    }
}

const mapStateToProps = state => {
    const { userState } = state;
    return {
        userState
    };
};
 
export default connect(mapStateToProps)(Login);