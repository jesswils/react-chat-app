import { useState, useEffect } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Thread from './components/Thread';
import Loading from './components/Loading';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import logo from './assets/speech-bubble.png';

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
export const db = getFirestore(app);

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
          <h1 className='header'>Public message board</h1>
          <div className='app'>
            <Thread user={user} />

          </div>
          <div className='sign-out-btn'>
            <Button
              variant='outlined'
              href='#outlined-buttons'
              onClick={signOut}
              color="error"
            >
              Sign Out
            </Button>
          </div>
          <div className='footer-wrapper'><Typography variant="body2">Built with React and Firebase. Icons from <a href='https://www.flaticon.com/free-icons/speech-bubble'>Freepik</a></Typography>
          </div>
        </>
      ) : (
        <div className='welcome'>
          <h1 className='welcome-text'>Welcome</h1>
          <img src={logo} alt='chat-icon' height='300' />
          <Typography variant='body1'>
            Sign in with your Google account
          </Typography>
          <br></br>
          <Button
            variant='outlined'
            href='#outlined-buttons'
            onClick={signInWithGoogle}
          >
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
}
export default App;
