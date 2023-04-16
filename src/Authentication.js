import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import './App.css';
import { auth, signInWithGoogle } from './firebase-config';

function App() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className='App'>
      <div className='google'>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
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

      <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={logout}> Sign Out </button>
    </div>
  );
}

export default App;
