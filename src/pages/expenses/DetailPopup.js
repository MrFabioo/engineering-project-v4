import React, { useState } from 'react';
import './Popup.css';

export const DetailPopup = ({ togglePopup }) => {
  const [users, setUsers] = useState(['Kamil', 'Kamil2', 'Boniek']);
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));

  const [title, setTitle] = useState('');
  const [cost, setCost] = useState(0);
  const [currency, setCurrency] = useState('PLN');
  const [payer, setPayer] = useState('');

  return (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-btn' onClick={() => togglePopup()}>
          Close
        </button>
        <button>Wydatki</button>
        <button>Bilans</button>
        <div>
          <form>
            <input type='text' placeholder='Tytuł' onChange={setTitle} />
            <input type='number' placeholder='Kwota' onChange={setCost} />
            <select onChange={setCurrency}>
              <option>PLN</option>
              <option>EUR</option>
            </select>
            <label>Data: </label>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label>Zapłacone przez: </label>
            <select onChange={setPayer}>
              {users?.map((user, i) => (
                <option key={i}>{user}</option>
              ))}
            </select>
            <ul>
              {users?.map((user, i) => (
                <div key={i}>
                  <input type='checkbox' defaultChecked />
                  <li>{user}</li>
                </div>
              ))}
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};
