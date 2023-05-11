import React from 'react';

export const Expens = ({
  expens: { id, currency, description, title, users },
  deleteExpens,
}) => {
  return (
    <li className='li'>
      <div className='row'>
        <h4 className='text'>{title}</h4>
        <p className='description'>{description}</p>
        <p className='currency'>{currency}</p>
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => deleteExpens(id)}>Delete</button>
    </li>
  );
};
