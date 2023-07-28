import React, { useState, useEffect } from 'react';
import { getPlacesData } from '../api';

import { MapSidebar } from './MapSidebar';
import { Map } from './Map';

export const AroundYou = () => {
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
    const filteredPlaces = places.filter((place) => place.rating >= rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating, places]);

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
    <div className='flex flex-no-wrap'>
      <div className='absolute sm:relative bg-gray-800 shadow flex-col justify-between hidden sm:flex border-t border-gray-700'>
        <MapSidebar
          setCoords={setCoords}
          places={filteredPlaces.length ? filteredPlaces : places}
          isLoading={isLoading}
          childClicked={childClicked}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
        />
      </div>
      <div className='container mx-auto md:w-4/5 w-11/12 h-[calc(100vh-64px)]'>
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
