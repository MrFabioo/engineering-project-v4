import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BagsList = ({
  expens: { id, title, from, to },
  deleteExpens,
  i,
}) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/bags/${id}`, {
      state: {
        id,
        from,
        to,
        title,
      },
    });
  };

  return (
    <tr className='h-24 border-gray-300 dark:border-gray-200 border-b cursor-pointer'>
      <td
        className='text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'
        onClick={handleRowClick}
      >
        {title}
      </td>
      <td className='pr-6 whitespace-no-wrap' onClick={handleRowClick}>
        <p className='text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm'>
          {`${from} - ${to}`}
        </p>
      </td>
      <td
        className='text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'
        onClick={handleRowClick}
      >
        {/* {currency} */}
      </td>
      <td className='pr-8 hover:text-red-500' onClick={() => deleteExpens(id)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon cursor-pointer icon-tabler icon-tabler-trash'
          width={20}
          height={20}
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
      </td>
    </tr>
  );
};
