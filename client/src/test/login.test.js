// Login Form Full DOM Rendering Test
import React from 'react';
import Login from '../containers/Login/Login';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../store/configureStore';
import { BrowserRouter as Router } from 'react-router-dom';
import * as actions from '../actions';

const WrappedComponent = () => {
  return (
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );
};

describe('<Login />', () => {
  const mockLogin = jest.spyOn(actions, 'userLogin');
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<WrappedComponent />);
  });

  it('Component should render without crashing', async () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('Component should trigger login', () => {
    wrapper
      .find('input[name="username"]')
      .simulate('change', { target: { value: 'jack' } });
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { value: '123456' } });
    wrapper.find('form').simulate('submit');

    expect(mockLogin).toHaveBeenCalledTimes(1);

    expect(mockLogin).toHaveBeenCalledWith({
      username: 'jack',
      password: '123456',
    });
  });
});
