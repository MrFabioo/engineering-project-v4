import { useState } from 'react';
import './Popup.css';
import {
  query,
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

export const ExpensesPopup = ({ togglePopup, db }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('PLN');
  const [users, setUsers] = useState(['']);

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
  };

  const changeCurrency = (currency) => {
    setCurrency(currency);
  };

  const handleAddUser = () => {
    const lastUser = users[users.length - 1];
    if (lastUser !== '') {
      setUsers([...users, '']);
    } else {
      setErrorMessage('Wypełnij puste pole !!!');
    }
  };

  const handleUserChange = (e, i) => {
    const newUser = [...users];
    newUser[i] = e.target.value;
    setUsers(newUser);
  };

  const handleUserFocus = () => {
    setErrorMessage('');
  };

  return (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-btn' onClick={() => togglePopup()}>
          Close
        </button>
        <form onSubmit={createExpens} className='form'>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='title'
            type='text'
            placeholder='Title'
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='description'
            type='text'
            placeholder='Description'
          />
          <select
            className='currnecy'
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
          <div className='users'>
            {users?.map((user, i) => (
              <input
                key={i}
                className='user'
                type='text'
                value={user}
                placeholder='User name'
                onChange={(e) => handleUserChange(e, i)}
                onFocus={handleUserFocus}
              />
            ))}

            <button className='button' type='button' onClick={handleAddUser}>
              New user
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
          <button
            className='button'
            type='submit'
            onClick={() => {
              if (title !== '' && users[0] !== '') {
                togglePopup();
              }
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
