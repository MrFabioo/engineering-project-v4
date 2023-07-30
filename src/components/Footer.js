import React from 'react';

export const Footer = () => {
  return (
    <div className='bg-gray-800 w-full'>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex items-center mt-3 mb-3'>
          <p className='text-base text-gray-800 pl-2 ml-2 text-white'>2023</p>
          <p className='border-l border-white text-base text-gray-800 pl-2 ml-2 font-semibold text-white'>
            Kamil Słomiński
          </p>
          <div className='border-l border-white pl-2 ml-2'>
            <p className='text-base text-gray-800 text-white'>
              Wszelkie prawa zastrzeżone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
