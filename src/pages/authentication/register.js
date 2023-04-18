import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase-config';

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const navigate = useNavigate();

  const register = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(result);
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h3> Register User </h3>
      <input
        placeholder='Email...'
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <input
        placeholder='Password...'
        type='password'
        onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}
      />
      <button onClick={register}> Create User</button>
    </div>
  );
};
export default Register;
