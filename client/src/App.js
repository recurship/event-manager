import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = { events: [] };
        this.getData();
    }

    getData() {
        let formData = new FormData();
        formData.append('username', 'admin');
        formData.append('password', '1299459ML');

        return fetch(`/api/token`, {
            method: 'POST',
            body: formData
        }).then(response => {
            return response.json();
        }).then(auth => {
            console.log('Got the auth', auth);
            return fetch(`/events`, {
                accept: 'application/json',
                headers: {
                    'Authorization': `Bearer ${ auth.access }`
                }
            })
        }).then(response => {
            return response.json()
        }).then(data => {
           console.log('Got the data', data);
           this.setState({ events: data });
        });
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Welcome to Event Manager</h1>
            </header>
            <div className="App-intro">
            {this.state.events.map( event => {
                return <div key={event.id}>{event.title} by {event.organisation}</div>
            })}
            </div>
          </div>
        );
    }
}

export default App;
