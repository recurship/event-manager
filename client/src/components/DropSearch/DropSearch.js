import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, FormGroup, Label, Button } from 'reactstrap';
import { BasePropsTypes } from '../../types/base-props-types';
import Select from 'react-select';
import { isEmpty } from 'lodash';
import AsyncSelect from 'react-select/lib/Async';
import {
  fetchOrganisation,
  fetchSponsors,
  fetchLocations,
  fetchTags,
} from '../../actions';
import { OrganisationType } from '../../types/organisation-types';
import { EventType } from '../../types/event-types';
import { SponsorType } from '../../types/sponsor-types';
import 'react-select/dist/react-select.min.css';
import './DropSearch.css';

type ReactSearchOptions = {
  label: string,
  value: string,
};

type Props = BaseReduxPropTypes & {
  organisations: Array<OrganisationType>,
  events: Array<EventType>,
  locations: Array<LocationType>,
  sponsors: Array<SponsorType>,
  handleSearchChange: Function,
};

export type State = {
  filterOrganisation: Array<Object>,
  filterDateFrom: string,
  filterDateTo: string,
  filterLocation: Object,
  filterSponsers: Array<Object>,
  filterKeywords: string,
  filterTags: Array<Object>,
  filterTime: Array<Object>,
};
class DropSearch extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      filterOrganisation: [],
      filterDateFrom: '',
      filterDateTo: '',
      filterLocation: {},
      filterSponsers: [],
      filterKeywords: '',
      filterTags: [],
      filterTime: [],
    };
    this.fetchDependencies();
  }

  fetchDependencies() {
    const dispatch = this.props.dispatch;
    dispatch(fetchOrganisation());
    dispatch(fetchSponsors());
    dispatch(fetchLocations());
    dispatch(fetchTags());
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSelect = e => {
    const { name, value } = e;
    this.setState({ [name]: value });
  };

  mapStateToOptions: (key: string) => Array<ReactSearchOptions> = key => {
    let options = [],
      target = this.props[key];
    target = target ? target[key] : [];
    return target.map(opt => ({ label: opt.name, value: opt.id }));
  };

  /**
   * @author Saad Abbasi
   * @name handleSearchChange
   * @argument e: HTMLButtonClick event
   * @description
   * - filters out empty/null values from state
   * - and pass either undefined or extracted object to prop (handleSearchChange method)
   * @returns undefined.
   */
  handleSearchChange = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let { handleSearchChange } = this.props,
      state = { ...this.state },
      stateHasValues = this.stateHasValues(),
      requiredElements;
    if (stateHasValues)
      requiredElements = Object.keys(state)
        .filter(key => !isEmpty(state[key]))
        .map(key => ({ [key]: state[key] }))
        .reduce((prev, next) => ({ ...prev, ...next }));
    handleSearchChange(requiredElements);
  };

  stateHasValues = () => {
    const state = { ...this.state },
      requiredProps = Object.keys(state).filter(key => !isEmpty(state[key]));
    return requiredProps.length > 0;
  };

  getTimeOptions = () => {
    return [
      {
        label: 'Morning',
        value: 'morning',
      },
      {
        label: 'Noon',
        value: 'noon',
      },
      {
        label: 'Evening',
        value: 'evening',
      },
    ];
  };

  render() {
    let { options, events, sortBy } = this.props;

    return (
      <div id="drop-search">
        <h5 className="legend">Filters</h5>
        <form onSubmit={this.handleSearchChange}>
          <FormGroup>
            <Label for="filterOrganisation">Organization</Label>
            <Select
              value={this.state.filterOrganisation}
              onChange={event =>
                this.handleSelect({ name: 'filterOrganisation', value: event })
              }
              options={this.mapStateToOptions('organisations')}
              multi={true}
            />
          </FormGroup>

          <FormGroup>
            <Label for="filterDateFrom">Start Date</Label>
            <Input
              name="filterDateFrom"
              type="date"
              value={this.state.filterDateFrom}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="filterDateTo">End Date</Label>
            <Input
              name="filterDateTo"
              type="date"
              value={this.state.filterDateTo}
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="filterLocation">Location</Label>
            <Select
              value={this.state.filterLocation}
              onChange={event =>
                this.handleSelect({ name: 'filterLocation', value: event })
              }
              options={this.mapStateToOptions('locations')}
            />
          </FormGroup>

          <FormGroup>
            <Label for="filterSponsers">Sponsors</Label>
            <Select
              value={this.state.filterSponsers}
              onChange={event =>
                this.handleSelect({ name: 'filterSponsers', value: event })
              }
              options={this.mapStateToOptions('sponsors')}
              multi={true}
            />
          </FormGroup>

          <FormGroup>
            <Label for="filterTags">Tags</Label>
            <Select
              value={this.state.filterTags}
              onChange={event =>
                this.handleSelect({ name: 'filterTags', value: event })
              }
              options={this.mapStateToOptions('tags')}
              multi={true}
            />
          </FormGroup>

          <FormGroup>
            <Label for="filterTime">Time</Label>
            <Select
              value={this.state.filterTime}
              onChange={event =>
                this.handleSelect({ name: 'filterTime', value: event })
              }
              options={this.getTimeOptions()}
              multi={true}
            />
          </FormGroup>

          <FormGroup>
            <Label for="filterKeywords">Key Words</Label>
            <Input
              name="filterKeywords"
              value={this.state.filterKeywords}
              onChange={this.handleInputChange}
              placeholder="Angular, React, UX, UI ..."
            />
          </FormGroup>

          <FormGroup>
            <Label for="sortBy">Sort By</Label>
            <Select
              name="sortBy"
              value={this.state.sortBy}
              options={sortBy}
              onChange={event =>
                this.handleSelect({ name: 'sortBy', value: event })
              }
            />
          </FormGroup>
          <br />
          <Button type="submit" className="btn btn-primary">
            Search
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({ ...state });
export default connect(mapStateToProps)(DropSearch);
