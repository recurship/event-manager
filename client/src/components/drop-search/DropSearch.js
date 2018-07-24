import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, FormGroup, Label, Button } from 'reactstrap';
import { uniqBy } from 'lodash';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
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
      filterSponsors: '',
      filterKeywords: '',
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    console.log(`updating ${name} to ${value}`);
    this.setState({ [name]: value });
  };

  handleSelect = e => {
    const { name, value } = e;
    console.log(`updating ${name} to ${value}`);
    this.setState({ [name]: value });
    console.log(this.state);
  };

  // getOrganizationOption = () => {
  //   let organisations = [],
  //     { events } = this.props;

  //   events = events ? events.events : [];
  //   organisations = events.map(ev => ev.organisation);
  //   organisations = uniqBy(organisations, 'id');
  //   this.mapStateToOptions('organisation');
  //   return organisations.map(org => ({ label: org.name, value: org.id }));
  // };
  mapStateToOptions = key => {
    let options = [],
      { events } = this.props;

    events = events ? events.events : [];
    options = events.map(event => event[key]);
    options = uniqBy(options, 'id');
    return options.map(opt => ({ label: opt.name, value: opt.id }));
  };

  render() {
    let { options, events, sortBy } = this.props;
    console.log('this.props drop search: ', this.props);
    return (
      <form id="drop-search">
        <h5 className="legend">Filters</h5>
        <FormGroup>
          <Label for="filterOrganisation">Organization</Label>
          <Select
            value={this.state.filterOrganisation}
            onChange={event =>
              this.handleSelect({ name: 'filterOrganisation', value: event })
            }
            options={this.mapStateToOptions('organisation')}
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
          <select
            name="filterLocation"
            onChange={this.handleInputChange}
            className="form-control"
          />
        </FormGroup>

        <FormGroup>
          <Label for="filterSponsors">Sponsors</Label>
          <Select
            name="filterSponsors"
            value={this.state.filterSponsors}
            options={sortBy}
            onChange={event =>
              this.handleSelect({ name: 'filterSponsors', value: event })
            }
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
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </form>
    );
  }
}
export default DropSearch;
