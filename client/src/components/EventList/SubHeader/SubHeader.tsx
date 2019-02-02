import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  ButtonGroup,
  Button,
  Row,
  Col,
} from 'reactstrap';

const SubHeader = () => {
  return (
    <Row>
      <Col md="6">
        <small>Filter By </small>
        <ButtonGroup size="sm">
          <Button>All</Button>
          <Button>Current Events</Button>
          <Button>Past Events</Button>
        </ButtonGroup>
      </Col>
      <Col md="6">
        <InputGroup>
          <Input placeholder="Search any event" />
          <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default SubHeader;
