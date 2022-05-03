import { initializeApp } from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB9pDOllg2jYhUVUtQuAuP1nt9nyK_Li-M",
    authDomain: "chat-app-28ed9.firebaseapp.com",
    projectId: "chat-app-28ed9",
    storageBucket: "chat-app-28ed9.appspot.com",
    messagingSenderId: "789502414393",
    appId: "1:789502414393:web:745e93fd7460549ef247e8"
};

const app = initializeApp(firebaseConfig);