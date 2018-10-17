import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from 'reactstrap';

storiesOf('Button', module).add('DropSearchButton', () => {
  const story = (
    <Button type="submit" className="btn btn-primary">
      Search
    </Button>
  );
  return story;
});

storiesOf('Button', module).add('CommentBoxButton', () => {
  const story = (
    <button className="btn btn-success" type="submit">
      Post
    </button>
  );
  return story;
});

storiesOf('Button', module).add('ForgotPasswordButton', () => {
  const story = (
    <Button type="submit" className="btn btn-warning text-right">
      Reset Password
    </Button>
  );
  return story;
});

storiesOf('Button', module).add('EditUserFormButton', () => {
  const story = (
    <Button id="submit_button" color="primary" type="submit">
      Submit
    </Button>
  );
  return story;
});

storiesOf('Button', module).add('SigupButton', () => {
  const story = (
    <input className="btn btn-dark" type="submit" value="Sign Up" />
  );
  return story;
});
