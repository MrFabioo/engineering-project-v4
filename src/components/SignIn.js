import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';
// import Register from './register';
// import Login from './login';

export const SignIn = () => {
  const [status, setStatus] = useState(true);
  //   const [sidebar, setsidebar] = useState();
  return (
    <div className='h-screen bg-gradient-to-tl from-gray-800 to-gray-700 w-full py-16 px-4'>
      <div className='flex flex-col items-center justify-center'>
        <div className='bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16'>
          {status ? (
            <Login setStatus={setStatus} />
          ) : (
            <Register setStatus={setStatus} />
          )}
        </div>
      </div>
    </div>
  );
};
