import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDncVgOnroqFOQ64KlH7ePTFTcsHv4LWmQ",
  authDomain: "clothing-ecommerce-f0317.firebaseapp.com",
  databaseURL: "https://clothing-ecommerce-f0317.firebaseio.com",
  projectId: "clothing-ecommerce-f0317",
  storageBucket: "clothing-ecommerce-f0317.appspot.com",
  messagingSenderId: "736908729198",
  appId: "1:736908729198:web:6ba5ca0b65d07307413f7f"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
      
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;