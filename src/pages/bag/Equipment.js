import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

export const Equipment = () => {
  const location = useLocation();
  const { id, title } = location.state;
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const q = query(collection(db, `bags/${id}/equipment/`));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let expensesArr = [];
      QuerySnapshot.forEach((doc) => {
        expensesArr.push({ ...doc.data(), id: doc.id });
      });
      setExpenses(expensesArr);
    });
    return () => unsubscribe();
  }, []);

  const handleCheckboxChange = async (expenseId, packed) => {
    try {
      // Update the 'packed' field of the expense in Firebase
      await updateDoc(doc(db, `bags/${id}/equipment/`, expenseId), {
        packed: !packed, // Toggle the 'packed' value
      });
    } catch (error) {
      console.error('Error updating checkbox:', error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      // Delete the expense document from Firebase
      await deleteDoc(doc(db, `bags/${id}/equipment/`, expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };
  return (
    <div className='w-full flex justify-center'>
      <div className='w-1/2'>
        <div className='border rounded-lg border pb-6 border-gray-200'>
          <div className='flex-row items-center border-b border-gray-200 justify-between px-6 py-3'>
            <h1 className='text-center xl:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-3'>
              {title}
            </h1>
          </div>
          <div className=''>
            <table className='w-full whitespace-nowrap'>
              <tbody>
                {expenses?.map((e, i) => (
                  <tr key={i} className='border-b'>
                    <td className='py-3 px-6'>
                      <div className='flex items-center'>
                        <div className='flex items-center justify-between text-sm leading-none w-full'>
                          <div className='flex items-center'>
                            <input
                              type='checkbox'
                              checked={e.packed}
                              className='mr-5 w-6 h-6'
                              onChange={() =>
                                handleCheckboxChange(e.id, e.packed)
                              }
                            />
                            <p className='font-semibold text-gray-800 mr-3 text-base'>
                              {e.name}
                            </p>
                          </div>
                          <p className='text-base'>{e.note}</p>
                          <div className='flex items-center'>
                            <p className='mr-5'>Ilość:</p>
                            <span>{e.number}</span>
                          </div>
                          <div
                            className='pr-8 hover:text-red-500'
                            onClick={() => handleDeleteExpense(e.id)}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='icon cursor-pointer icon-tabler icon-tabler-trash'
                              width={24}
                              height={24}
                              viewBox='0 0 24 24'
                              strokeWidth='1.5'
                              stroke='currentColor'
                              fill='none'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <path stroke='none' d='M0 0h24v24H0z' />
                              <line x1={4} y1={7} x2={20} y2={7} />
                              <line x1={10} y1={11} x2={10} y2={17} />
                              <line x1={14} y1={11} x2={14} y2={17} />
                              <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
                              <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
