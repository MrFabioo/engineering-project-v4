import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

export const BagsPopup = ({ togglePopup, db }) => {
  const [title, setTitle] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('PLN');

  const createExpens = async (e) => {
    e.preventDefault(e);
    if (title === '') {
      alert('Tytuł nie może być pusty!');
      return;
    }

    await addDoc(collection(db, 'bags'), {
      title: title,
      from: from,
      to: to,
    });
    setTitle('');
    setFrom();
    setTo();
    togglePopup();
  };

  return (
    <form onSubmit={createExpens}>
      <div
        className='py-12 z-50 bg-custom-rgba transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0'
        id='modal'
      >
        <div
          role='alert'
          className='container mx-auto w-11/12 md:w-2/3 max-w-lg'
        >
          <div className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400'>
            <h1 className='text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4'>
              Dodaj do listy bagażowej
            </h1>
            <label
              htmlFor='name'
              className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
            >
              Tytuł
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
            />
            <label className='text-gray-800 text-sm font-bold leading-tight tracking-normal'>
              Wyjazd
            </label>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              type='date'
              className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
            />
            <label className='text-gray-800 text-sm font-bold leading-tight tracking-normal'>
              Powrót
            </label>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              type='date'
              className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
            />
            <div className='flex items-center justify-start w-full'>
              <button className='focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm'>
                Utwórz
              </button>
            </div>
            <div
              className='cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out'
              onClick={() => togglePopup()}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                aria-label='Close'
                className='icon icon-tabler icon-tabler-x'
                width={20}
                height={20}
                viewBox='0 0 24 24'
                strokeWidth='2.5'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
