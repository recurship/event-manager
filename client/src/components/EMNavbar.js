// @flow

import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

type Props = {
  onSubmit: Function,
  token: String,
};

type State = {
  isOpen: boolean,
};

export class EMNavbar extends Component<Props, State> {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
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
            {this.props.token ? (
              <NavItem>
                <Link to="/login" onClick={this.props.onSubmit}>
                  LogOut
                </Link>
              </NavItem>
            ) : (
              ''
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
