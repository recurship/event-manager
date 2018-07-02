
import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
  } from 'reactstrap';

  import {
    Link
  } from 'react-router-dom'
  
  
export class EMNavbar extends Component {

    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

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
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
} 