// Login Form Full DOM Rendering Test
import React from 'react';
import { mount } from 'enzyme';
import LoginForm from '../components/LoginForm';

describe('<LoginForm />', () => {
  it('Form should submit', () => {
    const doLogin = event => {
      const inputs = {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
      };

      console.log(inputs);
    };

    const component = mount(<LoginForm onSubmit={jest.fn()} />);
    component.find('Button').simulate('submit', { preventDefault: jest.fn() });
  });
});
