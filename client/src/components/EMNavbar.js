// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { userLogout } from '../actions';
import User from '../types/multi-types';

type Props = {
  userState: User,
};

type State = {
  isOpen: boolean,
};

class EMNavbar extends Component<Props, State> {
  state = {
    isOpen: false,
  };

  logout = () => {
    const { dispatch } = this.props.userState;
    dispatch(userLogout());
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  getMyProfile = currentUser => {
    const { username, id } = currentUser;
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle>
          <span className="fa fa-user-circle fa-lg" />
          {` ${username}`}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem href={`/users/${id}`}>My Profile</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.logout}>Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  render() {
    const { userState } = this.props;
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarToggler onClick={this.toggle} className="mr-2" />
        <NavbarBrand href="/">community-manager</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
            {userState && userState.currentUser ? (
              this.getMyProfile(userState.currentUser)
            ) : (
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  const { userState } = state;
  return { userState };
};

export default connect(mapStateToProps)(EMNavbar);
