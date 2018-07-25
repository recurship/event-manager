import React from 'react';
import { Row, Col } from 'reactstrap';

const ContentHeader = props => {
  return (
    <Row className="block">
      <Col className="text-header">
        <h4>{props.heading}</h4>
      </Col>
    </Row>
  );
};

export default ContentHeader;
