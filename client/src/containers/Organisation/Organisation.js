import React, { Component } from 'react';
import { Container, Row, Col, CardImg, Button } from 'reactstrap';
import { EventList } from '../../components/EventList/EventList';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import { fetchCurrentOrganisation } from '../../actions';
import { isEmpty } from 'lodash';
import type { BaseReduxPropTypes } from '../../types/base-props-types';
import { connect } from 'react-redux';
import SocialShare from '../../components/SocialShare/SocialShare';
import MetaTags from 'react-meta-tags';

type Props = BaseReduxPropTypes & {
  organisation: Object,
};

class Organisation extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { organisation: {} };
  }
  componentDidMount() {
    this.getCurrentOrganisation();
  }

  getCurrentOrganisation = () => {
    const organisationId = this.props.match.params.organisation_id;
    const { dispatch } = this.props;
    dispatch(fetchCurrentOrganisation(organisationId));
  };

  render() {
    const { organisation } = this.props.currentOrganisation;
    return (
      <div>
        {!isEmpty(organisation) ? (
          <Container>
            <MetaTags>
              <title>{organisation.name}</title>
              <meta name="description" content={organisation.description} />
              <meta property="og:title" content={organisation.name} />
              <meta
                property="og:image"
                content={
                  organisation.logo
                    ? organisation.logo
                    : 'http://via.placeholder.com/350x150'
                }
              />
              <meta property="og:url" content={window.location.href} />
            </MetaTags>
            <CardImg top width="100%" src={organisation.logo} />
            <ContentHeader heading={organisation.name} />
            <Row className="block-content text-justify">
              <Col>
                <strong>{organisation.description}</strong>
                This HTML file is a template. If you open it directly in the
                browser, you will see an empty page. You can add webfonts, meta
                tags, or analytics to this file. The build step will place the
                bundled scripts into the tag. To begin the development, run `npm
                start` or `yarn start`. To create a production bundle, use `npm
                run build` or `yarn build`.<br />
                <center>
                  <Button className="btn btn-success my-3">Subscribe</Button>
                </center>
                <SocialShare />
              </Col>
            </Row>
            <ContentHeader heading="Our Events" />
            <Row className="block-content text-justify">
              {organisation.events ? (
                <Col>
                  <EventList events={organisation.events} />
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
  currentOrganisation: { ...state.currentOrganisation },
});

export default connect(mapStateToProps)(Organisation);
