import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../actions';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

class Login extends Component {

    static propTypes = {
        userState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

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
            <LoginForm onSubmit={this.login} /> : 
            <Redirect to={{
                pathname: "/",
            }}/>)
    }
}

const mapStateToProps = state => {
    const { userState } = state;
    return {
        userState
    };
}
 
export default connect(mapStateToProps)(Login);