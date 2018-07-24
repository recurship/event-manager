import React, { Component } from 'react';
import { Container, Row, Col, CardImg, Button } from 'reactstrap';
import { EventList } from '../../components/EventList/EventList';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import { fetchOrganisationDetail } from '../../actions';
import { connect } from 'react-redux';

type Props = BaseReduxPropTypes & {
  organisation: Object,
};

class Organisation extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { organisation: {} };
  }
  componentDidMount() {
    this.getOrganisationDetail();
  }

  getOrganisationDetail = () => {
    const organisationId = this.props.match.params.organisation_id;
    const { dispatch } = this.props;
    dispatch(fetchOrganisationDetail(organisationId));
  };

  render() {
    const { organisation } = this.props.organisationDetail;
    return (
      <div>
        {organisation && !organisation[0].detail ? (
          <Container>
            <CardImg top width="100%" src={organisation[0].logo} />
            <ContentHeader heading={organisation[0].name} />
            <Row className="block-content text-justify">
              <Col>
                <strong>{organisation[0].description}</strong>
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
              {organisation[0].events ? (
                <Col>
                  <EventList events={organisation[0].events} />
                </Col>
              ) : (
                <Col className="text-center">No Events</Col>
              )}
            </Row>
          </Container>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  organisationDetail: { ...state.organisationDetail },
});

export default connect(mapStateToProps)(Organisation);
