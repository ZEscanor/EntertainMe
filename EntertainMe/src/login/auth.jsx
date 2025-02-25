import {auth} from './firebase'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updatePassword, getAuth} from 'firebase/auth'


export const createUserWithEmailandPass = async (email, password) => {

 createUserWithEmailAndPassword(auth, email, password)
 .then((userCredential) => {
  const user = userCredential.user
  console.log("success")
  return user
 })

 .catch((error) =>{
  const errorCOde = error.code
 })
}

export const signInWithEmailandPass = async (email, password) => {
   signInWithEmailAndPassword(auth, email, password)
   try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { success: true, user };
  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { success: false, errorCode, errorMessage };
  }
}


export const googleSignIn = async() => {
  const provider = new GoogleAuthProvider();
  
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        localStorage.setItem('user', JSON.stringify(user));

      
        resolve(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        reject(error);
      });
  });
}

export const signOut = () => {
    return auth.signOut();
}

export const passwordReset = () => {
    return sendPasswordResetEmail(auth, email)
}

export const passwordChange = () => {
    return updatePassword(auth.currentUser, password)
}




