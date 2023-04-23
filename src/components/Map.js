import React from 'react';
import GoogleMapReact from 'google-map-react';
import './MapStyle.css';

const Map = ({ setCoords, setBounds, coords, places }) => {
  return (
    <div className='mapContainer'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC_7-SuRQv1t_yL59Mg8Bm8c5rOzb0tnUo' }}
        defaultCenter={{ lat: 0, lng: 0 }}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={() => {}}
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

export default Map;
