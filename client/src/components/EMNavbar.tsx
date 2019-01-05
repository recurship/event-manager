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
import { BaseReduxPropTypes, UserState } from '../types/base-props-types';
import { getFullname } from '../utils/utils';

type Props = BaseReduxPropTypes & {
  userState: UserState,
};

type State = {
  isOpen: boolean,
};

class EMNavbar extends Component<Props, State> {
  state = {
    isOpen: false,
  };

  logout = () => {
    this.props.dispatch(userLogout());
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  getDisplayName = user => {
    const { first_name, last_name, username, email } = user;
    if (first_name) {
      return `${first_name} ${last_name}`
    }
    else if (username) {
      return username
    }
    else return email
  }

  getMyProfile = currentUser => {
    const { id } = currentUser;
    const displayName = this.getDisplayName(currentUser);
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle>
          <span className="fa fa-user-circle fa-lg" />
          {` ${displayName}`}
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
            {userState && userState.currentUser && userState.token ? (
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
