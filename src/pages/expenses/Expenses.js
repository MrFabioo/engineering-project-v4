import React, { useEffect, useState } from 'react';
import { ExpensesPopup } from './ExpensesPopup';
import { Expens } from './Expens';
import { db } from '../../config/firebase-config';
import {
  query,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';

export const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'expenses'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let expensesArr = [];
      QuerySnapshot.forEach((doc) => {
        expensesArr.push({ ...doc.data(), id: doc.id });
      });
      setExpenses(expensesArr);
    });
    return () => unsubscribe();
  }, []);

  const togglePopup = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  const deleteExpens = async (id) => {
    await deleteDoc(doc(db, 'expenses', id));
  };

  return (
    <div>
      <h4>WYDATKI</h4>
      <ul>
        {expenses.map((expens, i) => (
          <Expens key={i} expens={expens} deleteExpens={deleteExpens} db={db} />
        ))}
      </ul>
      <button onClick={() => togglePopup()}>Dodaj</button>
      {popupIsOpen && <ExpensesPopup togglePopup={togglePopup} />}
    </div>
  );
};
