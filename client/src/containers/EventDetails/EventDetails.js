import React, { Component } from 'react';
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
export class EventDetails extends Component {
  render() {
    return (
      <div>
        <Container>
          <Card>
            <CardImg
              top
              width="100%"
              src="https://orig00.deviantart.net/1d0a/f/2013/086/3/1/facebook_cover_panda_by_alphacid-d5zfsbp.jpg"
              alt="Card image cap"
            />
            <CardBody>
              <CardSubtitle>
                <small className="text-muted">card.startDateTime</small>
              </CardSubtitle>
              <CardTitle>card.title</CardTitle>
              <CardText>card.description</CardText>
              <CardSubtitle>
                <small className="text-muted">card.organisation.name</small>
              </CardSubtitle>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}
