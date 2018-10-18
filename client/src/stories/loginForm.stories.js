import React from 'react';
import { storiesOf } from '@storybook/react';
import LoginForm from '../components/LoginForm/LoginForm';
import { Container } from 'reactstrap';
import '../containers/Login/Login.css';
import { withInfo } from '@storybook/addon-info';
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

storiesOf('LoginForm', module).add(
  'Login Form',
  withInfo(`
      Statless reuseable login form component. In order to run this component with styles need to 
      wrap under Container with class login-container
      
    
      ~~~js
      <LoginForm />
      ~~~
    
    `)(() => {
    const story = (
      <Provider store={store}>
        <Container className="login-container">
          {' '}
          <LoginForm />{' '}
        </Container>
      </Provider>
    );

    return story;
  })
);
