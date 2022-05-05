import { useState, useEffect } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import Thread from './components/Thread';
import Loading from './components/Loading'
import Button from '@mui/material/Button';

const firebaseConfig = {
  apiKey: 'AIzaSyB9pDOllg2jYhUVUtQuAuP1nt9nyK_Li-M',
  authDomain: 'chat-app-28ed9.firebaseapp.com',
  projectId: 'chat-app-28ed9',
  storageBucket: 'chat-app-28ed9.appspot.com',
  messagingSenderId: '789502414393',
  appId: '1:789502414393:web:745e93fd7460549ef247e8',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initalising, setInitialising] = useState(true);

  useEffect(() => {
    // get the currently signed-in user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);

      initalising && setInitialising(false);
    });
    return unsubscribe;
  }, [initalising]);

  const signInWithGoogle = async () => {
    // create an instance of the Google provider object
    const provider = new GoogleAuthProvider();
    // set the language to the default browser preference
    auth.useDeviceLanguage();
    // start signin process
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };

  if (initalising) return <Loading />;
  return (
    <div>
      {user ? (
        <>
          <Button variant="outlined" href="#outlined-buttons" onClick={signOut}>
            Sign Out
          </Button>
          <p>Welcome</p>
          <Thread user={user} />
        </>
      ) : (
        <Button variant="outlined" href="#outlined-buttons" onClick={signInWithGoogle}>
          Sign In
        </Button>
      )}
    </div>
  );
}
export default App;
