//           <button className='button' type='submit'>
//             Add
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

export const ExpensesPopup = ({
  togglePopup,
  db,
  currency,
  usersAmount,
  id,
  setUsersAmount,
}) => {
  const [titleDetail, setTitleDetail] = useState('');
  const [costDetail, setCostDetail] = useState(0);
  const [currencyDetail, setCurrencyDetail] = useState(currency);
  const [payerDetail, setPayerDetail] = useState(usersAmount[0].name);
  const [transactionDateDetail, setTransactionDateDetail] = useState(
    new Date().toISOString().substr(0, 10)
  );

  const createExpens = async (e) => {
    e.preventDefault(e);

    if (titleDetail === '') {
      alert('Please enter a title expens');
      return;
    }

    const checkedUserNames = usersAmount
      .filter((user) => user.isChecked)
      .map((user) => user.name);

    try {
      const resetUsersAmount = usersAmount.map((user) => ({
        ...user,
        isChecked: true,
      }));
      setUsersAmount(resetUsersAmount);

      await addDoc(collection(db, `expenses/${id}/detail`), {
        title: titleDetail,
        cost: costDetail,
        currency: currencyDetail,
        payer: payerDetail,
        transactionDate: transactionDateDetail,
        checkedUserNames: checkedUserNames,
      });

      setTitleDetail('');
      setCostDetail(0);
      setTransactionDateDetail(new Date().toISOString().substr(0, 10));
      togglePopup();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const changeCurrencyDetail = (currency) => {
    setCurrencyDetail(currency);
  };

  const changePayerDetail = (payer) => {
    setPayerDetail(payer);
  };

  const handleCheckboxChange = (index) => {
    const updatedUsersAmount = [...usersAmount];
    updatedUsersAmount[index].isChecked = !updatedUsersAmount[index].isChecked;
    setUsersAmount(updatedUsersAmount);
  };

  const calculateCheckedUsers = () => {
    const checkedUsers = usersAmount.filter((user) => user.isChecked);
    const checkedUsersCount = checkedUsers.length;
    const costPerCheckedUser =
      checkedUsersCount > 0 ? costDetail / checkedUsersCount : 0;
    return { checkedUsersCount, costPerCheckedUser };
  };

  const { costPerCheckedUser } = calculateCheckedUsers();

  return (
    <form onSubmit={createExpens}>
      <div
        className='py-12 z-50 bg-custom-rgba transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0'
        id='modal'
      >
        <div
          role='alert'
          className='container mx-auto w-11/12 md:w-2/3 max-w-lg'
        >
          <div className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400'>
            <h1 className='text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4'>
              Nowa lista wydatków
            </h1>
            <label
              htmlFor='name'
              className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
            >
              Tytuł
            </label>
            <input
              value={titleDetail}
              onChange={(e) => setTitleDetail(e.target.value)}
              type='text'
              className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
            />
            <label className='text-gray-800 text-sm font-bold leading-tight tracking-normal'>
              Koszt
            </label>
            <div className='relative mb-5 mt-2'>
              <input
                value={costDetail}
                onChange={(e) => setCostDetail(e.target.value)}
                type='number'
                className='text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
              />
            </div>
            <label className='text-gray-800 text-sm font-bold leading-tight tracking-normal'>
              Waluta
            </label>
            <div className='relative mb-5 mt-2'>
              <select
                className='text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
                onChange={(e) => {
                  changeCurrencyDetail(e.target.value);
                }}
                value={currencyDetail}
              >
                <option value='PLN'>PLN</option>
                <option value='EUR'>EUR</option>
                <option value='GBP'>GBP</option>
                <option value='USD'>USD</option>
              </select>
            </div>
            <label className='text-gray-800 text-sm font-bold leading-tight tracking-normal'>
              Data tranzakcji
            </label>
            <div className='relative mb-5 mt-2'>
              <input
                type='date'
                value={transactionDateDetail}
                onChange={(e) => setTransactionDateDetail(e.target.value)}
                className='mb-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
              />
              <label className='text-gray-800 text-sm font-bold leading-tight tracking-normal'>
                Zapłacone przez:
              </label>
              <div className='relative mb-5 mt-2'>
                <select
                  className='text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
                  onChange={(e) => {
                    changePayerDetail(e.target.value);
                  }}
                  value={payerDetail}
                >
                  {usersAmount?.map((user, i) => (
                    <option key={i} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='text-gray-600 font-normal w-full text-sm'>
                {usersAmount?.map((user, i) => (
                  <div key={i} className='flex justify-between'>
                    <input
                      className='mr-32'
                      type='checkbox'
                      checked={user.isChecked}
                      onChange={() => handleCheckboxChange(i)}
                    />
                    <p className='w-32'>{user.name}</p>
                    <p className='w-32'>
                      <input
                        type='number'
                        value={
                          user.isChecked ? costPerCheckedUser.toFixed(2) : 0
                        }
                        readOnly
                        className='w-24 text-right'
                      />
                      {currencyDetail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex items-center justify-start w-full'>
              <button className='focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm'>
                Utwórz
              </button>
            </div>
            <div
              className='cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out'
              onClick={() => togglePopup()}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                aria-label='Close'
                className='icon icon-tabler icon-tabler-x'
                width={20}
                height={20}
                viewBox='0 0 24 24'
                strokeWidth='2.5'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center py-12' id='button'>
        <button
          className='focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm'
          onclick='modalHandler(true)'
        >
          Open Modal
        </button>
      </div>
    </form>
  );
};
