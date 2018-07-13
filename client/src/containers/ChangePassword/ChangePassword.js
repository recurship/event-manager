import React, { Component } from 'react';
import { Container } from 'reactstrap';
import ChangePasswordForm from './../../components/ChangePasswordForm/ChangePasswordForm';
import { connect } from 'react-redux';
import { changePassword } from '../../actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
  }

  changePassword = async e => {
    e.preventDefault();

    const { password, newpassword } = e.target.elements,
      { dispatch } = this.props,
      payload = {
        password: password.value,
        newpassword: newpassword.value,
      };

    const response = await dispatch(changePassword(payload));

    console.log('response data:', response);
    if (response)
      toast.success(`${response} ...`, {
        position: toast.POSITION.TOP_RIGHT,
      });
  };

  render() {
    return (
      <Container className="login-container">
        <h4>Change Password</h4>
        <ChangePasswordForm onSubmit={this.changePassword} />
        <ToastContainer autoClose={8000} />
      </Container>
    );
  }
}

export default connect()(ChangePassword);
