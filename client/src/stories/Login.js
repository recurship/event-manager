import React from 'react';
import { storiesOf } from '@storybook/react';
import Login from '../containers/Login/Login';
import '../containers/Login/Login.css';
import { withInfo } from '@storybook/addon-info';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../store/configureStore';

storiesOf('Login', module)
  .addDecorator(story => (
    <Provider store={store}>
      <Router>{story()}</Router>
    </Provider>
  ))
  .add(
    'Login',
    withInfo(`
      Login form component with validation.
      
      ~~~js
      <Login />
      ~~~
    
    `)(() => {
      const story = <Login />;
      return story;
    })
  );
