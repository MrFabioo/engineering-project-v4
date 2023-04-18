import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Register from './register';
import Login from './login';

export const Authentication = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate('/');
  };

  return (
    <div>
      <p> Sign In To Continue </p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <Register />
      <Login />
    </div>
  );
};
