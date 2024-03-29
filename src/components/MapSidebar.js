import { useEffect, useState, createRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import PlaceDetails from './PlaceDetails';

export const MapSidebar = ({
  setCoords,
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  // TO MUSI BYĆ
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autC) => setAutocomplete(autC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [places]);
  // TO MUSI BYĆ
  // useEffect(() => {});

  // const showDropDownMenu_search = (el) => {
  //   el.target.parentElement.children[1].classList.toggle('hidden');
  // };
  // const swaptext_search = (el) => {
  //   const targetText = el.target.innerText;
  //   document.getElementById('drop-down-content-setter_search').innerText =
  //     targetText;
  //   document.getElementById('drop-down-div_search').classList.toggle('hidden');
  // };

  // const showDropDownMenuOne_search = (el) => {
  //   el.target.parentElement.children[1].classList.toggle('hidden');
  // };
  // const swaptextone_search = (el) => {
  //   const targetText = el.target.innerText;
  //   document.getElementById('drop-down-content-setter-one_search').innerText =
  //     targetText;
  //   document
  //     .getElementById('drop-down-div-one_search')
  //     .classList.toggle('hidden');
  // };
  // const showDropDownMenuTwo_search = (el) => {
  //   el.target.parentElement.children[1].classList.toggle('hidden');
  // };
  // const swaptexttwo_search = (el) => {
  //   const targetText = el.target.innerText;
  //   document.getElementById('drop-down-content-setter-two_search').innerText =
  //     targetText;
  //   document
  //     .getElementById('drop-down-div-two_search')
  //     .classList.toggle('hidden');
  // };

  // const plusme_search = (el) => {
  //   let currentValue = parseInt(
  //     el.target.parentElement.parentElement.children[2].innerText
  //   );

  //   el.target.parentElement.parentElement.children[2].innerText =
  //     currentValue + 1000;
  // };
  // const minusme_search = (el) => {
  //   let currentValue = parseInt(
  //     el.target.parentElement.parentElement.children[2].innerText
  //   );
  //   if (currentValue > 0) {
  //     el.target.parentElement.parentElement.children[2].innerText =
  //       currentValue - 1000;
  //   }
  // };

  return (
    <>
      <div>
        <div className='lg:max-w-[384px] md:max-w-[720px] w-full shadow rounded mx-auto px-6 '>
          <div className='mb-2'>
            <div className='mt-3 relative'>
              <p className='text-xl text-center font-medium leading-none text-gray-100 mb-3'>
                Ciekawe miejsca niedaleko ciebie
              </p>
            </div>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <div className='flex justify-start items-center py-2 relative'>
                <input
                  className='text-sm leading-none text-left text-gray-600 px-4 py-3 w-full border rounded border-gray-300 outline-none'
                  type='text'
                  placeholder='Search'
                />
                <svg
                  className='absolute right-3 z-10 cursor-pointer'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z'
                    stroke='#4B5563'
                    strokeWidth='1.66667'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M21 21L15 15'
                    stroke='#4B5563'
                    strokeWidth='1.66667'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </Autocomplete>
            <div className='mt-2 w-full'>
              <label className='text-sm text-left font-medium leading-none text-gray-100'>
                Typ
              </label>
              <select
                className='text-sm leading-none text-left text-gray-600 px-4 py-3 w-full border rounded border-gray-300  outline-none'
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option className='text-gray-600' value='restaurants'>
                  Restauracje
                </option>
                <option className='text-gray-600' value='hotels'>
                  Hotele
                </option>
                <option className='text-gray-600' value='attractions'>
                  Attractions
                </option>
              </select>
            </div>
            {/* Przerobić to tak aby działała ocena(Z LIST.JS) !!! */}
            <div className='mt-2 w-full'>
              <label className='text-sm text-left font-medium leading-none text-gray-100'>
                Ocena
              </label>
              <div className='flex justify-start items-center mt-2'>
                {/* <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value={0}>All</option>
                  <option value={3}>Above 3</option>
                  <option value={4}>Above 4</option>
                  <option value={4.5}>Above 4.5</option>
                </select> */}
                <div className='flex justify-between  items-center w-full border rounded border-gray-300 md:px-6 px-3 py-1 lg:gap-x-2 md:gap-x-2 gap-x-1'>
                  <button
                    value={0}
                    onClick={(e) => setRating(e.target.value)}
                    className='text-xs leading-10 text-gray-600 p-1 hover:bg-indigo-100 hover:text-indigo-700 hover:rounded focus:bg-indigo-100 focus:text-indigo-700 focus:rounded w-[60px]'
                  >
                    Wszystkie
                  </button>
                  <button
                    value={3}
                    onClick={(e) => setRating(e.target.value)}
                    className='text-xs leading-5 text-gray-600 p-1 hover:bg-indigo-100 hover:text-indigo-700 hover:rounded focus:bg-indigo-100 focus:text-indigo-700 focus:rounded w-[60px]'
                  >
                    Powyżej 3
                  </button>
                  <button
                    value={4}
                    onClick={(e) => setRating(e.target.value)}
                    className='text-xs leading-5 text-gray-600 p-1 hover:bg-indigo-100 hover:text-indigo-700 hover:rounded focus:bg-indigo-100 focus:text-indigo-700 focus:rounded w-[60px]'
                  >
                    Powyżej 4
                  </button>
                  <button
                    value={4.5}
                    onClick={(e) => setRating(e.target.value)}
                    className='text-xs leading-5 text-gray-600 p-1 hover:bg-indigo-100 hover:text-indigo-700 hover:rounded focus:bg-indigo-100 focus:text-indigo-700 focus:rounded w-[60px]'
                  >
                    Powyżej 4,5
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='text-gray-100 h-[calc(100vh-64px-314px)] overflow-y-scroll'>
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
          {/* <div className='mt-8 '>
            <label className='text-sm text-left font-medium leading-none text-gray-800 '>
              Amount
            </label>
            <div className='flex items-center border border-slate-300 px-4 py-3 rounded mt-2'>
              <div className='svg-container'>
                <svg
                  onClick={minusme_search}
                  className='hover:bg-gray-100 cursor-pointer rounded-full'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M21 12C21 7.03125 16.9688 3 12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12Z'
                    stroke='#475569'
                    strokeMiterlimit={10}
                  />
                  <path
                    d='M15.75 12H8.25'
                    stroke='#475569'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              <div className='dollar-container pl-4'>
                <p className='text-sm leading-none text-slate-600 pr-1'>$</p>
              </div>
              <div className='text-container w-full text-sm leading-none text-slate-600'>
                1000
              </div>
              <div className='svg-container'>
                <svg
                  onClick={plusme_search}
                  className='hover:bg-gray-100 cursor-pointer rounded-full'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M21 12C21 7.03125 16.9688 3 12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12Z'
                    stroke='#475569'
                    strokeMiterlimit={10}
                  />
                  <path
                    d='M12 8.25V15.75'
                    stroke='#475569'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M15.75 12H8.25'
                    stroke='#475569'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
            <div className='mt-8 '>
              <label className='text-sm text-left font-medium leading-none text-gray-800'>
                Category
              </label>
              <div className='dropdown-one border  border-gray-300 w-full rounded outline-none   relative mt-2'>
                <button
                  onClick={showDropDownMenuOne_search}
                  className='dropbtn-one relative px-5 py-[12px] flex items-center justify-between w-full'
                >
                  <span
                    className='pr-4 font-medium text-gray-600 text-sm'
                    id='drop-down-content-setter-one_search'
                  >
                    Q/A
                  </span>
                  <svg
                    className='absolute right-5 z-10 cursor-pointer'
                    width={10}
                    height={6}
                    viewBox='0 0 10 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M0.5 0.75L5 5.25L9.5 0.75'
                      stroke='#4B5563'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
                <div
                  className='hidden rounded w-full shadow border-t border-gray-200 px-1 py-2 absolute top-12 right-0 bg-white z-20'
                  id='drop-down-div-one_search'
                >
                  <a href='javascript:void(0)' className='hover'>
                    <p
                      className='text-sm leading-none text-gray-600 p-3 hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded cursor-pointer'
                      onClick={swaptextone_search}
                    >
                      Q/A
                    </p>
                  </a>
                  <a href='javascript:void(0)'>
                    <p
                      className='text-sm leading-none text-gray-600 p-3 hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded cursor-pointer'
                      onClick={swaptextone_search}
                    >
                      Designing
                    </p>
                  </a>
                  <a href='javascript:void(0)'>
                    <p
                      className='text-sm leading-none text-gray-600 p-3 hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded cursor-pointer'
                      onClick={swaptextone_search}
                    >
                      Developement
                    </p>
                  </a>
                  <a href='#'>
                    <p
                      className='text-sm leading-none text-gray-600 p-3 hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded cursor-pointer'
                      onClick={swaptextone_search}
                    >
                      Marketing
                    </p>
                  </a>
                  <a href='#'>
                    <p
                      className='text-sm leading-none text-gray-600 p-3 hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded cursor-pointer'
                      onClick={swaptextone_search}
                    >
                      Business Developement
                    </p>
                  </a>
                </div>
              </div>
            </div>
            <div className='mt-8'>
              <label className='text-sm text-left font-medium leading-none text-gray-800'>
                Group Type
              </label>
              <div className='dropdown-one border  border-gray-300 w-full rounded outline-none   relative mt-2'>
                <button
                  onClick={showDropDownMenuTwo_search}
                  className='dropbtn-one relative px-5 py-[12px] flex items-center justify-between w-full'
                >
                  <span
                    className='pr-4 font-medium text-gray-600 text-sm'
                    id='drop-down-content-setter-two_search'
                  >
                    All
                  </span>
                  <svg
                    className='absolute right-5 z-10 cursor-pointer'
                    width={10}
                    height={6}
                    viewBox='0 0 10 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M0.5 0.75L5 5.25L9.5 0.75'
                      stroke='#4B5563'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
                <div
                  className='hidden rounded w-full shadow border-t border-gray-200 px-1 py-2 absolute top-12 right-0 bg-white z-10'
                  id='drop-down-div-two_search'
                >
                  <a href='javascript:void(0)' className='hover'>
                    <p
                      className='text-sm leading-none text-gray-600 p-3 hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded cursor-pointer'
                      onClick={swaptexttwo_search}
                    >
                      All
                    </p>
                  </a>
                  <a href='javascript:void(0)'>
                    <p
                      className='text-sm leading-none text-gray-600 p-3 hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded cursor-pointer'
                      onClick={swaptexttwo_search}
                    >
                      Users
                    </p>
                  </a>
                  <a href='javascript:void(0)'>
                    <p
                      className='text-sm leading-none text-gray-600 p-3 hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded cursor-pointer'
                      onClick={swaptexttwo_search}
                    >
                      Orders
                    </p>
                  </a>
                </div>
              </div>
            </div>
            <div className='lg:flex justify-end mr-1 items-center gap-x-3 mt-12 lg:block md:hidden hidden'>
              <button className='text-sm font-medium leading-none text-center text-indigo-700 px-6 py-4 border rounded-md border-indigo-700  hover:bg-gray-100 transform duration-300 ease-in-out'>
                Cancel
              </button>
              <button className='text-sm font-medium leading-none text-white text-center  px-6 py-4 bg-indigo-700 rounded-md  hover:bg-indigo-600 transform duration-300 ease-in-out'>
                Search
              </button>
            </div>
            <div className='space-y-4 mt-12 lg:hidden md:block block'>
              <button className='text-sm font-medium leading-none text-center text-indigo-700 w-full px-6 py-4 border rounded-md border-indigo-700  hover:bg-gray-100 transform duration-300 ease-in-out'>
                Cancel
              </button>
              <button className='text-sm font-medium leading-none text-white text-center w-full px-6 py-4 bg-indigo-700 rounded-md  hover:bg-indigo-600 transform duration-300 ease-in-out'>
                Search
              </button>
            </div>
          </div> */}
        </div>

        <style>
          {`
       body{
    background: rgb(229 231 235);
        } 
        `}
        </style>
      </div>
    </>
  );
};
