import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { BaseReduxPropTypes, BaseReducerPropsTypes } from '../../types/base-props-types';
import SignupForm from '../../components/SignupForm/SignupForm';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignup } from '../../actions/index';
import { History } from '../../types/react-router-types';

type Props = BaseReduxPropTypes & History & BaseReducerPropsTypes;

type State = {
  errors: Array<Object>,
}

class Signup extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }
  signup = async e => {
    e.preventDefault();
    const {
      username,
      firstname,
      lastname,
      email,
      password,
    } = e.target.elements,
      { dispatch, history } = this.props,
      payload = {
        firstname: firstname.value,
        lastname: lastname.value,
        username: username.value,
        email: email.value,
        password: password.value,
      };

    const response = await dispatch(userSignup(payload));
    if (response && response.id) {
      history.push('/login');
    } else {
      let errorResponse = this.state.errors;
      Object.keys(response).map(item => {
        errorResponse = [...errorResponse, ...response[item]];
        return errorResponse;
      });
      this.setState({ errors: errorResponse });
    }
  };

  render() {
    return this.props.userState.token === null ? (
      <Container className="login-container">
        <h4>Sign Up</h4>
        <hr />
        <SignupForm onSubmit={this.signup} />
        {this.state.errors.map((error, i) => (
          <p className="error-message text-danger" key={i}>
            {error}
          </p>
        ))}
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
