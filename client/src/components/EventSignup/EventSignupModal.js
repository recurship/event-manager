import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import SignUpForm from '../EventSignupForm/EventSignupForm';
import { postEventSignupDetails } from '../../actions';
import { connect } from 'react-redux';

class EventSignupModal extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = e => {
    e.preventDefault();
    const { dispatch, eventForm } = this.props;
    const { name, email, phone } = e.target.elements;

    console.log('this.props==>', name, email, phone);

    const payload = {
      name: name.value,
      email: email.value,
      phone: phone.value,
    };

    dispatch(postEventSignupDetails(payload, eventForm.id));
  };
  render() {
    const { props } = this;
    const { eventForm } = this.props;
    return (
      <div>
        <Modal
          isOpen={props.showModal}
          toggle={value => {
            props.toggle(value);
          }}
        >
          <ModalHeader>{eventForm.title}</ModalHeader>
          <ModalBody>
            <SignUpForm fields={eventForm.fields} onSubmit={this.onSubmit} />
          </ModalBody>
          {/* <ModalFooter style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={this.onSubmit}>Signup</Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default connect(null)(EventSignupModal);
