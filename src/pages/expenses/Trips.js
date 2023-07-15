import React, { useEffect, useState } from 'react';
import { TripsList } from './TripsList';
import { db } from '../../config/firebase-config';
import {
  query,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import './Trips.css';
//POPUP
import { TripsPopup } from './TripsPopup';

export const Trips = () => {
  const [expenses, setExpenses] = useState([]);

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

  const deleteExpens = async (id) => {
    await deleteDoc(doc(db, 'expenses', id));

    const querySnapshot = await getDocs(
      collection(db, 'expenses', id, 'detail')
    );
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  };

  // POPUP
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const togglePopup = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  return (
    <div className='bg'>
      <div className='container'>
        <h3 className='heading'>Expenses App</h3>
        <button onClick={() => togglePopup()}>Dodaj</button>
        {popupIsOpen && <TripsPopup togglePopup={togglePopup} db={db} />}
        <ul>
          {expenses.map((expens, i) => (
            <TripsList key={i} expens={expens} deleteExpens={deleteExpens} />
          ))}
        </ul>
        {expenses.length < 1 ? null : (
          <p className='count'>{`You have ${expenses.length} expenses`}</p>
        )}
      </div>
    </div>
  );
};
