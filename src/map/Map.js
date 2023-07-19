import React from 'react';
import { Map, Polyline, GoogleApiWrapper, Marker } from 'google-maps-react';
import { useRef, useEffect } from 'react';

const MapContainer = (props) => {
  const mapStyles = {
    width: '100%',
    height: '400px',
  };

  const { google } = props; //destructure the 'google' object from props
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      //access the Google Maps API object through the mapRef
      const map = mapRef.current.map;
      //set the map type to "Satellite"
      map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    }
  }, [google]);

  const renderPolylines = () => {
    return props.polylines.map((polyline, index) => (
      <Polyline
        key={index}
        path={google.maps.geometry.encoding.decodePath(polyline)}
        options={{ strokeColor: '#FF0000' }} //customize the polyline's appearance
      />
    ));
  };

  const renderMarker = () => {
    if (props.location) {
      return (
        <Marker
          position={{ lat: props.location.latitude, lng: props.location.longitude }}
          title="User Location"
        />
      );
    }
    return null;
  };

  return (
    <Map
      google={google} //use the 'google' object from props
      zoom={14}
      style={mapStyles}
      initialCenter={{ lat: props.location.latitude, lng: props.location.longitude}}
      ref={mapRef}
    >
      {renderPolylines()}
      {renderMarker()}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  libraries: ['geometry'],
})(MapContainer);
