import React from 'react';
import { storiesOf } from '@storybook/react';
import Signup from '../containers/Signup/Signup';
import '../containers/Login/Login.css';
import { withInfo } from '@storybook/addon-info';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../store/configureStore';

storiesOf('Signup', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'Signup',
    withInfo(`
      Signup form container to check the registration functionality.
      
      ~~~js
      <Signup />
      ~~~
    
    `)(() => {
      const story = (
        <Router>
          <Signup />
        </Router>
      );
      return story;
    })
  );
