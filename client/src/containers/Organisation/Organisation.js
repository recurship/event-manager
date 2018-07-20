import React, { Component } from 'react';
import { Container, Row, Col, CardImg, Button } from 'reactstrap';
import { EventList } from '../../components/EventList/EventList';
import ContentHeader from '../../components/ContentHeader/ContentHeader';

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
        'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png',
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
    return (
      <div>
        <Container>
          <CardImg top width="100%" src={this.state.organisation.logo} />
          <ContentHeader heading={this.state.organisation.name} />
          <Row className="block-content text-justify">
            <Col>
              <strong>{this.state.organisation.description}</strong>
              This HTML file is a template. If you open it directly in the
              browser, you will see an empty page. You can add webfonts, meta
              tags, or analytics to this file. The build step will place the
              bundled scripts into the tag. To begin the development, run `npm
              start` or `yarn start`. To create a production bundle, use `npm
              run build` or `yarn build`.<br />
              <center>
                <Button className="btn btn-success my-3">Subscribe</Button>
              </center>
            </Col>
          </Row>
          <ContentHeader heading="Our Events" />
          <Row className="block-content text-justify">
            <Col>
              {this.state.organisation.events ? (
                <EventList events={this.state.organisation.events} />
              ) : (
                <Container>
                  <h4 className="text-center">Not Any Event Yet</h4>
                </Container>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Organisation;
