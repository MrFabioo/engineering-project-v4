import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import { query, collection, onSnapshot } from 'firebase/firestore';

export const Expens = () => {
  const location = useLocation();
  const { id, title, payer, transactionDate } = location.state;
  const [expenses, setExpenses] = useState([]);

  const { idDetail } = useParams();

  useEffect(() => {
    const q = query(collection(db, `expenses/${id}/detail/`));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let expensesArr = [];
      QuerySnapshot.forEach((doc) => {
        expensesArr.push({ ...doc.data(), id: doc.id });
      });
      setExpenses(expensesArr);
    });
    return () => unsubscribe();
  }, []);

  const filtered = expenses.filter((expense) => expense.id === idDetail);

  const filteredExpense = filtered.length > 0 ? filtered[0] : null;

  console.log(expenses);
  console.log(filteredExpense);

  return (
    <div>
      {filteredExpense && (
        <>
          <h2>{filteredExpense.title}</h2>
          <h3>
            {parseFloat(filteredExpense.cost).toFixed(2).replace('.', ',')}{' '}
            {filteredExpense.currency}
          </h3>
          <p>Zapłacone przez: {payer}</p>
          <span>{filteredExpense.transactionDate}</span>
          <p>Dla {filteredExpense.checkedUserNames.length} uczestników:</p>
          <ul>
            {filteredExpense.checkedUserNames?.map((name, i) => (
              <li key={i}>
                {name} -{' '}
                {(
                  filteredExpense.cost / filteredExpense.checkedUserNames.length
                )
                  .toFixed(2)
                  .replace('.', ',')}{' '}
                {filteredExpense.currency}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
