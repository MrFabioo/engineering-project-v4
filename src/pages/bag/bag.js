import React, { useEffect, useState } from 'react';
import { BagList } from './TripsList';
import { db } from '../../config/firebase-config';
import {
  query,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import './Bag.css';
//POPUP
import { BagPopup } from './BagPopup';

export const Bag = () => {
  const [bags, setBags] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'bag'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let bagArr = [];
      QuerySnapshot.forEach((doc) => {
        bagArr.push({ ...doc.data(), id: doc.id });
      });
      setBags(bagArr);
    });
    return () => unsubscribe();
  }, []);

  // const deleteExpens = async (id) => {
  //   await deleteDoc(doc(db, 'bag', id));

  //   const querySnapshot = await getDocs(
  //     collection(db, 'expenses', id, 'detail')
  //   );
  //   querySnapshot.forEach((doc) => {
  //     deleteDoc(doc.ref);
  //   });
  // };

  // POPUP
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const togglePopup = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  return (
    <div className='bg'>
      <div className='container'>
        <h3 className='heading'>Bag</h3>
        <button onClick={() => togglePopup()}>Dodaj</button>
        {popupIsOpen && <BagPopup togglePopup={togglePopup} db={db} />}
        <ul>
          {bags.map((bag, i) => (
            <div>A</div>
            // <BagsList key={i} bag={bag} deleteExpens={deleteBag} />
          ))}
        </ul>
        {bags.length < 1 ? null : (
          <p className='count'>{`You have ${bags.length} bags`}</p>
        )}
      </div>
    </div>
  );
};
