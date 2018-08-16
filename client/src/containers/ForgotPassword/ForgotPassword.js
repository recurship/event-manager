// @flow
import React, { Component } from 'react';
import ForgotPasswordForm from '../../components/ForgotPassword/ForgotPasswordForm';
import type { BaseReduxPropTypes } from '../../types/base-props-types';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions';
import './ForgotPassword.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = BaseReduxPropTypes & {
  resetPasswordState: Object,
};

class ForgotPassword extends Component<Props> {
  // constructor(props) {
  //   super(props);
  // }

  static getDerivedStateFromProps(props) {
    const message = props.resetPasswordState.message;
    if (message)
      toast.success(`${message} ...`, {
        position: toast.POSITION.TOP_RIGHT,
      });
  }

  resetPassword = e => {
    e.preventDefault();

    const { dispatch } = this.props,
      email = e.target.elements.email.value;
    dispatch(resetPassword({ email }));
  };

  render() {
    return (
      <Container className="login-container">
        <h4>Forgot Password?</h4>
        <ForgotPasswordForm onSubmit={this.resetPassword} />
        <ToastContainer autoClose={8000} />
      </Container>
    );
  }
}
const mapStateToProps = ({ resetPasswordState }) => ({ resetPasswordState });

export default connect(mapStateToProps)(ForgotPassword);
