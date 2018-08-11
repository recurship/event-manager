import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import SocialShare from '../SocialShare/SocialShare';

const DescriptionComponent = props => {
  return (
    <Row className="block-content text-justify">
      <Col md="9">{props.description ? props.description : null}</Col>
      <Col md="3">
        <center>
          <h6>Organiser Contact</h6>
          <Button className="bg-success">Subscribe</Button>
          <SocialShare />
        </center>
      </Col>
    </Row>
  );
};
export default DescriptionComponent;
