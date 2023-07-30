import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../config/firebase-config';
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

  const deleteExpens = async (id, idDetail) => {
    await deleteDoc(doc(db, 'expenses', id, 'detail', idDetail));
  };

  // POPUP
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const togglePopup = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  return (
    <div className='min-h-footer'>
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
      <div
        onClick={() => togglePopup()}
        className='absolute right-5 bottom-5 text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 w-20 h-20 rounded-full flex items-center justify-center'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-plus'
          width={48}
          height={48}
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' />
          <line x1={12} y1={5} x2={12} y2={19} />
          <line x1={5} y1={12} x2={19} y2={12} />
        </svg>
      </div>
      <div className='mx-auto container bg-white dark:bg-gray-800 shadow rounded'>
        <div className='flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full'>
          <div className='w-full flex flex-col lg:flex-row items-start lg:items-center justify-center'>
            <div className='lg:ml-6 flex-wrap items-center'>
              <h1 className='text-center xl:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-3'>
                {title}
              </h1>
              <p className='text-center'>
                Uczestnicy:
                {usersAmount?.map((user, i) =>
                  i === usersAmount.length - 1
                    ? `${user.name}`
                    : ` ${user.name}, `
                )}
              </p>
            </div>
          </div>
        </div>
        <div className='w-full overflow-x-scroll xl:overflow-x-hidden flex justify-center items-center'>
          <table className='min-w-3/4 bg-white dark:bg-gray-800'>
            <thead>
              <tr className='w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8'>
                <th className='text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'>
                  Tytuł
                </th>
                <th className='text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'>
                  Zapłacone przez
                </th>
                <th className='text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'>
                  Kwota
                </th>
                <th className='text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'>
                  Data
                </th>
                <td className='text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4'>
                  Usuń
                </td>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
