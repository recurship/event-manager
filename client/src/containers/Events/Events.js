// @flow

import React, { Component } from 'react';
import { Row, Col, Jumbotron, Container } from 'reactstrap';
import { fetchEvents, postEvent } from '../../actions';
import { makeQueryStringTransformable } from '../../utils/utils';
// import type { BaseReduxPropTypes } from '../../types/base-props-types';
import { connect } from 'react-redux';
import { EventList } from '../../components/EventList/EventList';
import DropSearch, {
  State as DropSearchState,
} from '../../components/DropSearch/DropSearch';

const mainTitle = 'Portal for Tech Communities';
const eventNotFound = 'No events found.';

// type Props = BaseReduxPropTypes & {
//   userState: Object,
//   events: Object,
// };

class Events extends Component {
  componentDidMount() {
    this.getData();
  }
  getSortyByOptions = () => {
    return [
      {
        label: 'Start Date',
        value: 'startDate',
      },
      {
        label: 'Organisation',
        value: 'organisation',
      },
      {
        label: 'Sponsors',
        value: 'sponsers',
      },
      {
        label: 'Location',
        value: 'location',
      },
      {
        label: 'Tags',
        value: 'tags',
      },
      {
        label: 'Time',
        value: 'time',
      },
    ];
  };

  handleSearchChange = searchParams => {
    if (searchParams) searchParams = makeQueryStringTransformable(searchParams);
    this.getData(searchParams);
  };

  getData = e => {
    const { dispatch } = this.props;
    dispatch(fetchEvents(e));
  };

  handleSubmit = event => {
    event.preventDefault();

    const {
      title,
      description,
      startDateTime,
      endDateTime,
      organisation,
    } = event.nativeEvent.target.elements;

    this.props.dispatch(
      postEvent({
        title: title.value,
        description: description.value,
        startDateTime: startDateTime.value,
        endDateTime: endDateTime.value,
        organisation: organisation.value,
      })
    );
  };

  render() {
    const { events } = this.props;
    return (
      <div>
        <Jumbotron>
          <h3 className="text-center">{mainTitle}</h3>
        </Jumbotron>
        <Container>
          <Row>
            <Col md="12">
              <DropSearch
                sortBy={this.getSortyByOptions()}
                handleSearchChange={this.handleSearchChange}
                events={events}
              />
            </Col>
          </Row>
        </Container>
        {events.events.length ? (
          <EventList events={events.events} />
        ) : (
          <Container>
            <h4 className="text-center">{eventNotFound}</h4>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  null
)(Events);
