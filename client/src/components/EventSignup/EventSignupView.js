import React, { Component } from 'react';
import { Label, Button } from 'reactstrap';

export default class EventSignupView extends Component {
  render() {
    const { props } = this;
    return (
      <div
        style={{
          display: 'flex',

          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '50%',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3>
            <Label>Sign Up For This Event</Label>
          </h3>
          {props.isRegistered ? (
            <span style={{ color: 'green' }}> Signed up! </span>
          ) : (
            <Button onClick={props.onSignUpPress}>Sign Up</Button>
          )}
        </div>
      </div>
    );
  }
}
