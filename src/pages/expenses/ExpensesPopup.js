import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import './Popup.css';

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
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-btn' onClick={() => togglePopup()}>
          Close
        </button>
        <form className='form' onSubmit={createExpens}>
          <input
            className='title'
            type='text'
            placeholder='Title'
            value={titleDetail}
            onChange={(e) => setTitleDetail(e.target.value)}
          />
          <input
            className='cost'
            type='number'
            placeholder='Cost'
            value={costDetail}
            onChange={(e) => setCostDetail(e.target.value)}
          />
          <select
            className='currnecy'
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
          <input
            className='transactionDate'
            type='date'
            value={transactionDateDetail}
            onChange={(e) => setTransactionDateDetail(e.target.value)}
          />
          <div>
            Zapłacone przez:
            <select
              className='payer'
              value={payerDetail}
              onChange={(e) => {
                changePayerDetail(e.target.value);
              }}
            >
              {usersAmount?.map((user, i) => (
                <option key={i} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className='users'>
            {usersAmount?.map((user, i) => (
              <div key={i}>
                <input
                  type='checkbox'
                  checked={user.isChecked}
                  onChange={() => handleCheckboxChange(i)}
                />
                {user.name}
                <input
                  type='number'
                  value={user.isChecked ? costPerCheckedUser : 0}
                  readOnly
                />
                {currencyDetail}
              </div>
            ))}
          </div>
          <button className='button' type='submit'>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
