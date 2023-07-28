import React from 'react';
import GoogleMapReact from 'google-map-react';
import './MapStyle.css';

export const Map = ({
  setCoords,
  setBounds,
  coords,
  places,
  setChildClicked,
}) => {
  return (
    <div className='mapContainer'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 0, lng: 0 }}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
      >
        {places?.map((place, i) => (
          <div
            className='markerContainer'
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          ></div>
        ))}
      </GoogleMapReact>
    </div>
  );
};
