// export const Expens = () => {

//   return (
//     <div>
//       {filteredExpense && (
//         <>
//           <span>{filteredExpense.transactionDate}</span>
//           <p>Dla {filteredExpense.checkedUserNames.length} uczestników:</p>
//           <ul>
//             {filteredExpense.checkedUserNames?.map((name, i) => (
//               <li key={i}>
//                 {name} -{' '}
//                 {(
//                   filteredExpense.cost / filteredExpense.checkedUserNames.length
//                 )
//                   .toFixed(2)
//                   .replace('.', ',')}{' '}
//                 {filteredExpense.currency}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { db } from '../config/firebase-config';
import { query, collection, onSnapshot } from 'firebase/firestore';

export const Expens = () => {
  const location = useLocation();
  const { id, title, payer, transactionDate, cost, currency } = location.state;
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
  return (
    <div className='min-h-footer w-full flex justify-center'>
      {filteredExpense && (
        <div className='w-1/2'>
          {/* <div className='flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full'>
              <div className='w-full flex flex-col lg:flex-row items-start lg:items-center justify-center'>
                <div className='lg:ml-6 flex-wrap items-center'></div>
              </div>
            </div> */}
          <div className='border rounded-lg border pb-6 border-gray-200'>
            <div className='flex-row items-center border-b border-gray-200 justify-between px-6 py-3'>
              <h1 className='text-center xl:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-3'>
                {filteredExpense.title}
              </h1>
              <h2 className='text-center xl:text-3xl md:text-2xl text-xl font-bold text-gray-800 mb-3'>
                {parseFloat(filteredExpense.cost).toFixed(2).replace('.', ',')}{' '}
                {filteredExpense.currency}
              </h2>
              <div className='flex justify-between'>
                <p>Zapłacone przez: {payer}</p>
                <span>{filteredExpense.transactionDate}</span>
              </div>
              <p>Dla {filteredExpense.checkedUserNames.length} uczestników:</p>
            </div>
            <div className=''>
              <table className='w-full whitespace-nowrap'>
                <tbody>
                  {filteredExpense.checkedUserNames?.map((name, i) => (
                    <tr key={i} className='border-b '>
                      <td className='py-3 px-6'>
                        <div className='flex items-center'>
                          <div className='pl-3'>
                            <div className='flex items-center text-sm leading-none'>
                              <p className='font-semibold text-gray-800'>
                                {name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6'>
                        <div>
                          <p className='text-sm font-semibold leading-none text-right text-gray-800'>
                            {(
                              filteredExpense.cost /
                              filteredExpense.checkedUserNames.length
                            )
                              .toFixed(2)
                              .replace('.', ',')}{' '}
                            {filteredExpense.currency}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
