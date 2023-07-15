import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import {
  query,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { ExpensesList } from './ExpensesList';
import { ExpensesPopup } from './ExpensesPopup';

export const Expenses = () => {
  const location = useLocation();
  const { id, currency, title, users } = location.state;

  const [usersAmount, setUsersAmount] = useState(users);

  const [expensesDetail, setExpensesDetail] = useState([]);

  useEffect(() => {
    const q = query(collection(db, `expenses/${id}/detail`));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let expensesArr = [];
      QuerySnapshot.forEach((doc) => {
        expensesArr.push({ ...doc.data(), id: doc.id });
      });
      setExpensesDetail(expensesArr);
    });
    return () => unsubscribe();
  }, [id]);
  console.log(expensesDetail, 'asd');

  const deleteExpens = async (id, idDetail) => {
    await deleteDoc(doc(db, 'expenses', id, 'detail', idDetail));
  };

  // POPUP
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const togglePopup = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  return (
    <div>
      <div className='title'>
        <h4>{title}</h4>
        <p>
          {usersAmount?.map((user, i) =>
            i === usersAmount.length - 1 ? `${user.name}` : `${user.name}, `
          )}
        </p>
      </div>
      <div className='container'>
        <button onClick={() => togglePopup()}>Nowy wydatek</button>
        {popupIsOpen && (
          <ExpensesPopup
            togglePopup={togglePopup}
            db={db}
            currency={currency}
            usersAmount={usersAmount}
            setUsersAmount={setUsersAmount}
            id={id}
          />
        )}
      </div>
      <div className='expenses'>
        {expensesDetail?.map((expens, i) => (
          <ExpensesList
            key={i}
            expens={expens}
            i={i}
            currency={currency}
            id={id}
            usersAmount={usersAmount}
            // setUsersAmount={setUsersAmount}
            idDetail={expens.id}
            deleteExpens={deleteExpens}
          />
        ))}
      </div>
      <Link to='/tours'>Back to product</Link>
    </div>
  );
};
