import React from 'react';
import { Carusel } from './Carusel';
import { Highlight } from './Highlight';

export const Main = () => {
  return (
    <div>
      <h1 className='text-center xl:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mt-10'>
        Miejsca, które warto odwiedzić!
      </h1>
      <Carusel />
      <h1 className='text-center xl:text-5xl md:text-4xl text-2xl font-bold text-gray-800'>
        W czym pomoże ci ta strona?
      </h1>
      <Highlight />
    </div>
  );
};
