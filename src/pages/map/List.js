import { createRef, useState, useEffect } from 'react';
import PlaceDetails from './PlaceDetails';

import './ListStyle.css';

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  console.log({ childClicked });

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [places]);

  return (
    <div className='container'>
      <h4>Restaurants, Hotels & Attractions around you</h4>
      {isLoading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <>
          <form>
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value='restaurants'>Restauracje</option>
              <option value='hotels'>Hotele</option>
              <option value='attractions'>Attractions</option>
            </select>
          </form>
          <form>
            <label>Rating:</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value={0}>All</option>
              <option value={3}>Above 3</option>
              <option value={4}>Above 4</option>
              <option value={4.5}>Above 4.5</option>
            </select>
          </form>
          <div className='list'>
            {places?.map((place, i) => (
              <div ref={elRefs[i]} key={i}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked === i)}
                  refProp={elRefs[i]}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default List;
