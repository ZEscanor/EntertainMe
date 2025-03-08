



import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
 
 const apikeyF = import.meta.env.GOOGLE_FIREBASE_API_KEY
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_GOOGLE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };
 

    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp)

    export {firebaseApp, auth};
    