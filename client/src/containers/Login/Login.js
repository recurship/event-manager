import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../../actions';
import { Redirect, Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { Container } from 'reactstrap';
import './Login.css';

class Login extends Component {


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
                <hr />
                <p className="centralized">
                    Not registered yet? <Link to="/signup"> Sign Up </Link>
                </p>
            </Container> 
            :
            <Redirect to={{ pathname: "/" }}/>
        )
    }
}

const mapStateToProps = state => {
    const { userState } = state;
    return {
        userState
    };
}
const propTypes = {
    userState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Login);