import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'netflixclone-19dee.firebaseapp.com',
  projectId: 'netflixclone-19dee',
  storageBucket: 'netflixclone-19dee.appspot.com',
  messagingSenderId: '826770580495',
  appId: '1:826770580495:web:e573f7b628587805b42f7a',
  measurementId: 'G-7W9Z1SXXW6',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export default storage;
