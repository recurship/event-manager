import React, { Component } from 'react';
import './App.css';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
  } from 'reactstrap';
import AuthService from './services/auth';
import EventService from './services/events';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'

const Home = () => (
<div>
    <h2>Home</h2>
</div>
)

const About = () => (
<div>
    <h2>About</h2>
</div>
)


class App extends Component {

    constructor() {
        super();
        this.state = {
            events: [],
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
        this.getData();
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    getData() {
        let service  = new AuthService();
        let events = new EventService();

        return service.login('admin', '1299459ML').then(auth => {
            console.log('Got the auth', auth);
            events.accessToken = auth.access;
            return events.getAll();
        }).then(data => {
           console.log('Got the data', data);
           this.setState({ events: data.results ? data.results : [] });
        });
    }

    render() {
        return (
            <Router>
                <div>
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
                    <Jumbotron>
                    <Container>
                        <Row>
                        <Col>
                            <h1>Welcome to Event Management for communities...</h1>
                            <p>
                            <Button
                                tag="a"
                                color="success"
                                size="large"
                                onClick={ this.getData.bind(this) }
                            >
                                Fetch events!
                            </Button>
                            </p>
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="App-intro">
                                {(this.state.events.length === 0) ? <div> No events found! </div> : <div></div> }
                                {this.state.events.map( event => {
                                    return <div key={event.id}>{event.title} by {event.organisation}</div>
                                })}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    </Jumbotron>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                </div>
          </Router>
        );
    }
}

export default App;
