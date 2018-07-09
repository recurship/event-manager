// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { userLogin } from '../../actions';
import { Redirect } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { Container } from 'reactstrap';
import './Login.css';

type dispatch = {
    dispatch: (action: Action ) => any
}

type Props = dispatch & {
    userState: Object,
<<<<<<< HEAD
=======
    dispatch: Function
>>>>>>> e17d8990e2c9a2947150de8839087107c928a46c
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