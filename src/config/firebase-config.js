import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC_CeOPz3f8YfTabxyytwtREOLHf16z1ag',
  authDomain: 'inzynierka-92bd6.firebaseapp.com',
  projectId: 'inzynierka-92bd6',
  storageBucket: 'inzynierka-92bd6.appspot.com',
  messagingSenderId: '309411074975',
  appId: '1:309411074975:web:56156b6c0676a7b56ee3aa',
  measurementId: 'G-P0W0WZX9EG',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const db = getFirestore(app);
