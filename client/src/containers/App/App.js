import React, { Component } from 'react';
import './App.css';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
  } from 'reactstrap';
import AuthService from '../../services/auth';
import EventService from '../../services/events';
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
        this.eventsService = new EventService();

        return service.login('admin', '1299459ML').then(auth => {
            console.log('Got the auth', auth);
            this.eventsService.accessToken = auth.access;
            return this.eventsService.getAll();
        }).then(data => {
           console.log('Got the data', data);
           this.setState({ events: data.results ? data.results : [] });
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { title, description, start_datetime, end_datetime, organisation } = event.nativeEvent.target.elements;

        this.eventsService.add({
            title: title.value,
            description: description.value,
            start_datetime: start_datetime.value,
            end_datetime: end_datetime.value,
            organisation: organisation.value
        });
    }

    render() {
        return (
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
                <Container>
                    <Jumbotron>
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
                                    return <div key={event.id}>{event.title} by {event.organisation.name}</div>
                                })}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Add Event</p>
                                <form onSubmit={this.handleSubmit}>
                                    <input className="form-control" type="text" name="title" />
                                    <input className="form-control" type="text" name="description" />
                                    <input className="form-control" type="datetime-local" name="start_datetime" />
                                    <input className="form-control" type="datetime-local" name="end_datetime" />
                                    <select name="organisation">
                                        <option value="1">Angular Pakistan</option>
                                    </select>
                                    <Button
                                        tag="button"
                                        color="success"
                                        size="small"
                                        type="submit">
                                        Add event
                                    </Button>
                                </form>
                            </Col>
                        </Row>
                    </Jumbotron>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                </Container>
            </div>
        );
    }
}

export default App;
