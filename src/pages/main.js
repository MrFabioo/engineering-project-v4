import React, { useState, useEffect } from 'react';

import { getPlacesData } from '../api';
import Header from '../components/Header';
import List from '../components/List';
import Map from '../components/Map';

import './main.css';

export const Main = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds]);
  return (
    <div className='wrapper'>
      <div className='left'>
        <Header setCoords={setCoords} />
        <List
          className='list'
          places={filteredPlaces.length ? filteredPlaces : places}
          isLoading={isLoading}
          childClicked={childClicked}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
        />
      </div>
      <div className='right'>
        <Map
          className='map'
          setCoords={setCoords}
          setBounds={setBounds}
          coords={coords}
          places={places}
          setChildClicked={setChildClicked}
        />
      </div>
    </div>
  );
};
