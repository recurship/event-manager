import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, FormGroup, Label, Button } from 'reactstrap';
import Select from 'react-select';
import { isEmpty } from 'lodash';
import AsyncSelect from 'react-select/lib/Async';
import {
  fetchOrganisation,
  fetchSponsors,
  fetchLocations,
} from '../../actions';
import 'react-select/dist/react-select.min.css';
import './DropSearch.css';

class DropSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOrganisation: '',
      filterDateFrom: '',
      filterDateTo: '',
      filterLocation: '',
      filterSponser: '',
      filterKeywords: '',
    };
    this.fetchDependencies();
  }

  fetchDependencies() {
    const dispatch = this.props.dispatch;
    dispatch(fetchOrganisation());
    dispatch(fetchSponsors());
    dispatch(fetchLocations());
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSelect = e => {
    const { name, value } = e;
    this.setState({ [name]: value });
  };

  mapStateToOptions = key => {
    let options = [],
      target = this.props[key];
    target = target ? target[key] : [];
    return target.map(opt => ({ label: opt.name, value: opt.id }));
  };

  handleSearchChange = e => {
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
            <Label for="filterSponser">Sponsors</Label>
            <Select
              value={this.state.filterSponser}
              onChange={event =>
                this.handleSelect({ name: 'filterSponser', value: event })
              }
              options={this.mapStateToOptions('sponsors')}
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
