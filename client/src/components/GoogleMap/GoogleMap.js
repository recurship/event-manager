import React, { Component } from 'react';
import {
  GoogleApiWrapper as apiWrapper,
  InfoWindow,
  Map,
  Marker,
} from 'google-maps-react';
class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };
  onMapClick = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  render() {
    const style = {
      width: '89%',
      height: '75vh',
    };
    return (
      <Map
        item
        xs={12}
        style={style}
        google={this.props.google}
        onClick={this.onMapClick}
        zoom={14}
        initialCenter={this.props.location.coordinates}
      >
        <Marker
          onClick={this.onMarkerClick}
          title={this.props.location.name}
          position={this.props.location.coordinates}
          name={this.props.location.name}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <h2>{this.props.location.name}</h2>
          <p>{this.props.location.address}</p>
        </InfoWindow>
      </Map>
    );
  }
}
export default apiWrapper({
  apiKey: 'AIzaSyAzHCccXh0UbA8TqR8WwbLmSval6_M9_0w',
})(GoogleMap);
