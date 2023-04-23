import React from 'react';
import { Autocomplete } from '@react-google-maps/api';

const Header = () => {
  return (
    <div>
      {/* <Autocomplete> */}
      <div className='search'>
        <div className='searchIcon'></div>
        <input placeholder='Search...' />
      </div>
      {/* </Autocomplete> */}
    </div>
  );
};

export default Header;
