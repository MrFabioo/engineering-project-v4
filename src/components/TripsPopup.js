import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

export const TripsPopup = ({ togglePopup, db }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('PLN');
  const [users, setUsers] = useState([{ name: '', isChecked: true }]);

  const createExpens = async (e) => {
    e.preventDefault(e);
    if (title === '') {
      alert('Please enter a title expens');
      return;
    }

    if (users[0] === '') {
      alert('Please add at least one user');
      return;
    }

    await addDoc(collection(db, 'expenses'), {
      title: title,
      description: description,
      currency: currency,
      users: users,
    });
    setTitle('');
    setDescription('');
    setCurrency('PLN');
    setUsers(['']);
    togglePopup();
  };

  const changeCurrency = (currency) => {
    setCurrency(currency);
  };

  const handleAddUser = () => {
    const lastUser = users[users.length - 1];
    if (lastUser !== '') {
      setUsers([...users, { name: '', isChecked: true }]);
    } else {
      setErrorMessage('Wypełnij puste pole !!!');
    }
  };

  const handleUserChange = (e, i) => {
    const newUser = [...users];
    newUser[i].name = e.target.value;
    setUsers(newUser);
  };

  const handleUserFocus = () => {
    setErrorMessage('');
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
              Nowa lista wydatków
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
              Opis
            </label>
            <div className='relative mb-5 mt-2'>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type='text'
                className='text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
              />
            </div>
            <label className='text-gray-800 text-sm font-bold leading-tight tracking-normal'>
              Waluta
            </label>
            <div className='relative mb-5 mt-2'>
              <select
                className='text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
                onChange={(e) => {
                  changeCurrency(e.target.value);
                }}
                value={currency}
              >
                <option value='PLN'>PLN</option>
                <option value='EUR'>EUR</option>
                <option value='GBP'>GBP</option>
                <option value='USD'>USD</option>
              </select>
            </div>
            <label className='text-gray-800 text-sm font-bold leading-tight tracking-normal'>
              Uczestnicy
            </label>
            <div className='relative mb-5 mt-2'>
              {users?.map((user, i) => (
                <input
                  key={i}
                  type='text'
                  value={user.name}
                  placeholder='User name'
                  onChange={(e) => handleUserChange(e, i)}
                  onFocus={handleUserFocus}
                  className='mb-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
                />
              ))}
              <button
                className='focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm'
                type='button'
                onClick={handleAddUser}
              >
                Nowy uczestnik
              </button>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
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
