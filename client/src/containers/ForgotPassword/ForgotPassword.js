// @flow
import React, { Component } from 'react';
import ForgotPasswordForm from '../../components/ForgotPassword/ForgotPasswordForm';
import ResetPasswordForm from '../../components/ResetPassword/ResetPasswordForm';
import type { BaseReduxPropTypes } from '../../types/base-props-types';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions';
import './ForgotPassword.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parse } from 'query-string';

type Props = BaseReduxPropTypes & {
  resetPasswordState: Object,
};

class ForgotPassword extends Component<Props> {
  static getDerivedStateFromProps(props) {
    const message = props.resetPasswordState.message;
    if (message)
      toast.success(`${message} ...`, {
        position: toast.POSITION.TOP_RIGHT,
      });
  }

  forgotPassword = e => {
    e.preventDefault();

    const { dispatch } = this.props,
      email = e.target.elements.email.value;
    dispatch(resetPassword({ email }));
  };

  resetPassword = e => {
    e.preventDefault();
    const { dispatch, location } = this.props,
      payload = {
        password: e.target.elements.password.value,
        ...parse(location.search),
      };
    dispatch(resetPassword(payload, location.search));
  };

  render() {
    const { location } = this.props;
    return (
      <Container className="login-container">
        {location.search ? (
          <div>
            <h4>Reset Password</h4>
            <ResetPasswordForm onSubmit={this.resetPassword} />
          </div>
        ) : (
          <div>
            <h4>Forgot Password?</h4>
            <ForgotPasswordForm onSubmit={this.forgotPassword} />
          </div>
        )}
        <ToastContainer autoClose={8000} />
      </Container>
    );
  }
}
const mapStateToProps = ({ resetPasswordState }) => ({ resetPasswordState });

export default connect(mapStateToProps)(ForgotPassword);
