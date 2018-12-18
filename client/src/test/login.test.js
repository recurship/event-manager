// Login Form Full DOM Rendering Test
import React from 'react';
import Login from '../containers/Login/Login';
import LoginForm from '../components/LoginForm/LoginForm';
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

  it('Should check if empty form is invalid', () => {
    expect(
      wrapper.find(LoginForm).instance().ref.wrappedInstance.props.valid
    ).toEqual(false);
  });

  it('Should check if fields can be edited', () => {
    wrapper
      .find('input[name="username"]')
      .simulate('change', { target: { value: 'jack' } });
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { value: '123456' } });
  });

  it('Should check if filled form is valid', () => {
    expect(
      wrapper.find(LoginForm).instance().ref.wrappedInstance.props.valid
    ).toEqual(true);
  });

  it('SHould check if login is triggered', () => {
    wrapper.find('form').simulate('submit');
    expect(mockLogin).toHaveBeenCalledTimes(1);

    expect(mockLogin).toHaveBeenCalledWith({
      username: 'jack',
      password: '123456',
    });
  });
});
