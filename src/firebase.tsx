import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAa7BcjKIN4FNtsEVTC65A11R0ikUwNF-o",
    authDomain: "auth-demo-572b6.firebaseapp.com",
    projectId: "auth-demo-572b6",
    storageBucket: "auth-demo-572b6.appspot.com",
    messagingSenderId: "134062182669",
    appId: "1:134062182669:web:3ef15818ac7fc3201c2044",
    measurementId: "G-BTVX4MS1E9"
};

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
export const generateUserDocument = async (user: any, additionalData: any) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };
  const getUserDocument = async (uid: any) => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();
