import React from 'react';
import { storiesOf } from '@storybook/react';
import LoginForm from '../components/LoginForm';
import { Container } from 'reactstrap';
import '../containers/Login/Login.css';
import { withInfo } from '@storybook/addon-info';
import { specs, describe, it } from 'storybook-addon-specifications';
import { mount } from 'enzyme';

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
      <Container className="login-container">
        {' '}
        <LoginForm />{' '}
      </Container>
    );
    spec(() =>
      describe('LoginForm', () => {
        test('simulates click event', () => {
          const wrapper = mount(story);
          wrapper.find('Button').simulate('click');
          expect(onButtonClick.calledOnce).to.equal(true);
        });
      })
    );

    return story;
  })
);
