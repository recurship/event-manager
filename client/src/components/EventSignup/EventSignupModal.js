import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import SignUpForm from '../EventSignupForm/EventSignupForm';
import { postEventSignupDetails } from '../../actions';
import { connect } from 'react-redux';
import withLoader from '../Loader/withLoader';
import {
  ModalBodyTypes,
  EventSignupModalTypes,
} from '../../types/event-form-types';

const ModalBody_ = props => (
  <div>
    <ModalHeader>{props.eventForm.title}</ModalHeader>
    <ModalBody>
      <SignUpForm
        fields={props.eventForm.fields}
        onSubmit={props.onSubmit}
        registered={props.registered}
        toggle={props.toggle}
      />
    </ModalBody>
  </div>
);

ModalBody_.propTypes = ModalBodyTypes;

const ModalContent = withLoader(ModalBody_);
class EventSignupModal extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = e => {
    e.preventDefault();
    const { dispatch, eventForm } = this.props;
    const { name, email, phone } = e.target.elements;

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
      <Modal
        isOpen={props.showModal}
        toggle={value => {
          props.toggle(value);
        }}
      >
        <ModalContent
          showModal={props.showModal}
          eventForm={eventForm}
          isFetching={props.isFetching}
          onSubmit={this.onSubmit}
          toggle={props.toggle}
          registered={props.registered}
        />
      </Modal>
    );
  }
}

EventSignupModal.propTypes = EventSignupModalTypes;
export default connect(null)(EventSignupModal);
