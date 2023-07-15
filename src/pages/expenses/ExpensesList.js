import React from 'react';
import { Link } from 'react-router-dom';

export const ExpensesList = ({
  expens: { title, payer, cost, transactionDate },
  id,
  i,
  currency,
  idDetail,
  deleteExpens,
}) => {
  console.log(id);
  return (
    <div>
      <Link
        to={{
          pathname: `/expenses/${id}/${idDetail}`,
        }}
        state={{
          id,
          currency,
          // description,
          title,
          cost,
          payer,
          // users,
        }}
        className='expensesElement'
      >
        <div key={i}>
          <h5>{title}</h5>
          <p>Zapłacone przez: {payer}</p>
          <h5>{`${cost} ${currency}`}</h5>
          <p>{transactionDate}</p>
        </div>
      </Link>
      <button onClick={() => deleteExpens(id, idDetail)}>Delete</button>
    </div>
  );
};
