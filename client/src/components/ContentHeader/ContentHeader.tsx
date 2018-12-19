import React from 'react';
import { Row, Col } from 'reactstrap';

type Props = {
  heading: string
};

const ContentHeader = (props: Props) => {
  return (
    <Row className="block">
      <Col className="text-header">
        <h4>{props.heading}</h4>
      </Col>
    </Row>
  );
};

export default ContentHeader;
