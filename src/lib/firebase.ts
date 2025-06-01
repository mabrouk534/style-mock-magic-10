
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAvtSKnWCxGludrWmWuN4dlZThB2A45cUo",
  authDomain: "champions-bf44d.firebaseapp.com",
  projectId: "champions-bf44d",
  storageBucket: "champions-bf44d.firebasestorage.app",
  messagingSenderId: "577357258687",
  appId: "1:577357258687:web:61b2152a179b3a7e31cb0a",
  measurementId: "G-S19F6LNLP2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
