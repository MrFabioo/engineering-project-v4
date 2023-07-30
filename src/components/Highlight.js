import React from 'react';

export const Highlight = () => {
  return (
    <div className='2xl:container 2xl:mx-auto'>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-24 md:gap-10 gap-12 lg:px-20 md:py-12 md:px-6 py-9 px-4'>
        {/* Free Shipping Grid Card */}
        <div className='flex space-x-4'>
          <div>
            <p className=' text-xl leading-5 font-semibold text-gray-800 '>
              Miejsca w okolicy
            </p>
            <p className=' text-base leading-6 font-normal text-gray-600 mt-3'>
              W tej sekcji znajdziesz restauracje, hotele lub atrakcje w okolicy
              któa cię interesuje.
            </p>
          </div>
        </div>

        {/* Support Grid Card */}

        <div className='flex space-x-4'>
          <div>
            <p className=' text-xl leading-5 font-semibold text-gray-800 '>
              Wydatki grupowe
            </p>
            <p className=' text-base leading-6 font-normal text-gray-600 mt-3'>
              Ta sekcja pozwoli ci oraz twoim znajomym na śledzenie waszych
              wydatków.
            </p>
          </div>
        </div>

        {/* MonyBack Guarantee card */}

        <div className='flex space-x-4'>
          <div>
            <p className=' text-xl leading-5 font-semibold text-gray-800 '>
              Rzeczy do spakowania
            </p>
            <p className=' text-base leading-6 font-normal text-gray-600 mt-3'>
              Tutaj sporządzisz listę rzeczy które chcesz spakować na wyjazd.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
