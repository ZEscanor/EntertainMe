



import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
 
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyC7lrzJz8lTKwAAcSQE90pjOoUgBuExhA0",
      authDomain: "entertainme-399518.firebaseapp.com",
      projectId: "entertainme-399518",
      storageBucket: "entertainme-399518.appspot.com",
      messagingSenderId: "803804088935",
      appId: "1:803804088935:web:4465ac7f03b1deb7c8a2c2",
      measurementId: "G-WL9V53RF7G"
    };
 

    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp)

    export {firebaseApp, auth};
    