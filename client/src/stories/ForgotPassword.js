import React from 'react';
import { storiesOf } from '@storybook/react';
import ForgotPassword from '../containers/ForgotPassword/ForgotPassword';
import '../containers/Login/Login.css';
import { withInfo } from '@storybook/addon-info';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../index';

storiesOf('ForgotPassword', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'ForgotPassword',
    withInfo(`
      Demo of the Forgot Password form in the application.
    
      ~~~js
      <ForgotPassword />
      ~~~
    
    `)(() => {
      const story = (
        <Router>
          <ForgotPassword />
        </Router>
      );
      return story;
    })
  );
