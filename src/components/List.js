import React from 'react';
// import { useState } from 'react';
import PlaceDetails from './PlaceDetails';

const List = ({ places, isLoading }) => {
  // const [type, setType] = useState('restaurants');
  // const [rating, setRating] = useState('');
  return (
    <div className='container'>
      <h4>Restaurants, Hotels & Attractions around you</h4>
      {isLoading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <>
          <form>
            <label>Type:</label>
            <select name='types'>
              <option value='restaurants'>Restauracje</option>
              <option value='hotels'>Hotele</option>
              <option value='attractions'>Attractions</option>
            </select>
          </form>
          <form>
            <label>Rating:</label>
            <select name='types'>
              <option value={0}>All</option>
              <option value={3}>Above 3</option>
              <option value={4}>Above 4</option>
              <option value={4.5}>Above 4.5</option>
            </select>
          </form>
          <div className='list'>
            {places?.map((place, i) => (
              <div key={i}>{<PlaceDetails place={place} />}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default List;
