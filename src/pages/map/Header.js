import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const Header = ({ setCoords }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autC) => setAutocomplete(autC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };
  return (
    <div className='header'>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <div className='search'>
          <div className='searchIcon'></div>
          <input placeholder='Search...' />
        </div>
      </Autocomplete>
    </div>
  );
};

export default Header;
