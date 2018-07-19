import React, { Component } from 'react';
import { Container, Jumbotron, Button } from 'reactstrap';
import { EventList } from '../../components/EventList/EventList';

class Organisation extends Component {
  constructor() {
    super();
    this.state = { organisation: {} };
  }
  componentDidMount() {
    const mockOrganisation = {
      id: 1,
      name: 'GDG Kolachi',
      is_active: false,
      logo:
        'http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png',
      description:
        'The biggest Google tech conference in Karachi. All about Android, Web, and Cloud.',
      owner: {
        id: '9eadb84d-bb29-4df7-9779-dd03cece1f8b',
        username: 'admin',
        first_name: null,
        last_name: null,
        enable_notifications: true,
        email: 'admin@test.com',
        avatar: null,
      },
      events: [
        {
          id: 1,
          title: 'test event 101',
          description: 'testing 101',
          start_datetime: '2081-02-08T20:39:00+0000',
          end_datetime: '3938-02-08T15:08:00+0000',
          cover:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnzYTGB_573n9gKI4kaVlYkBvOrSrCFmShnC5ZIr_wYwlU1MMs2w',
        },
        {
          id: 2,
          title: 'test event 102',
          description: 'testing 102',
          start_datetime: '2081-02-08T20:39:00+0000',
          end_datetime: '3938-02-08T15:08:00+0000',
          cover:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnzYTGB_573n9gKI4kaVlYkBvOrSrCFmShnC5ZIr_wYwlU1MMs2w',
        },
        {
          id: 3,
          title: 'test event 103',
          description: 'testing 103',
          start_datetime: '2081-02-08T20:39:00+0000',
          end_datetime: '3938-02-08T15:08:00+0000',
          cover:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnzYTGB_573n9gKI4kaVlYkBvOrSrCFmShnC5ZIr_wYwlU1MMs2w',
        },
      ],
    };
    this.setState({ organisation: mockOrganisation });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Jumbotron>
          <h3>{this.state.organisation.name}</h3>
          <h6>{this.state.organisation.description}</h6>
          <Button className="btn btn-success">Subscribe</Button>
        </Jumbotron>
        {this.state.organisation.events ? (
          <EventList events={this.state.organisation.events} />
        ) : (
          <Container>
            <h4 className="text-center">Not Any Event Yet</h4>
          </Container>
        )}
      </div>
    );
  }
}

export default Organisation;
