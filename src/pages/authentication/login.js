import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase-config';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const navigate = useNavigate();

  const login = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(result);
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <h3> Login </h3>
      <input
        placeholder='Email...'
        onChange={(event) => {
          setLoginEmail(event.target.value);
        }}
      />
      <input
        placeholder='Password...'
        type='password'
        onChange={(event) => {
          setLoginPassword(event.target.value);
        }}
      />
      <button onClick={login}> Login</button>
    </div>
  );
};
export default Login;
