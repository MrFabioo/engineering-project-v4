import React, { useState, useEffect } from 'react';

import { getPlacesData } from '../api';
import Header from '../components/Header';
import List from '../components/List';
import Map from '../components/Map';

export const Main = () => {
  // const [rating, setRating] = useState('');

  const [places, setPlaces] = useState([]);

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  // const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getPlacesData(bounds.sw, bounds.ne).then((data) => {
        setPlaces(data);
        setIsLoading(false);
      });
    }
  }, [bounds]);
  return (
    <>
      <Header />
      <List places={places} isLoading={isLoading} />
      <Map
        setCoords={setCoords}
        setBounds={setBounds}
        coords={coords}
        places={places}
      />
    </>
  );
};
