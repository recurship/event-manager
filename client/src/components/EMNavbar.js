// @flow

import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { userLogout } from '../actions';
import type { BaseReduxPropTypes } from '../types/base-props-types';

type Props = {
  userData: Object,
};

type State = {
  isOpen: boolean,
};

export class EMNavbar extends Component<Props, State> {
  state = {
    isOpen: false,
  };

  logout = () => {
    const { dispatch } = this.props.userData;
    dispatch(userLogout());
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { userState } = this.props.userData;
    return (
      <Navbar color="dark" dark exapand="true">
        <NavbarToggler right="true" onClick={this.toggle} />
        <NavbarBrand href="/">community-manager</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/about">About</Link>
            </NavItem>
            {userState && userState.token ? (
              <NavItem>
                <Link onClick={this.logout} to="/login">
                  Logout
                </Link>
              </NavItem>
            ) : (
              <NavItem>
                <Link to="/login">Login</Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
