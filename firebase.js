import { initializeApp , getApps } from "firebase/app";
import { collection, doc, setDoc  , getDocs , getFirestore , where , query , deleteDoc  , updateDoc , increment  , getDoc  , orderBy , limit } from "firebase/firestore";
import { signInWithEmailAndPassword , getAuth , signOut , updatePassword  , createUserWithEmailAndPassword , onAuthStateChanged , updateProfile  , fetchSignInMethodsForEmail   } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL  , refFromURL, deleteObject } from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyBtUCHrNmEzIVvqLem_xAHw9vPJuSWEWGU",
    authDomain: "trendprapp.firebaseapp.com",
    projectId: "trendprapp",
    storageBucket: "trendprapp.appspot.com",
    messagingSenderId: "866416936188",
    appId: "1:866416936188:web:725e24987d776ac4fe0379",
    measurementId: "G-B774GVVVWL"
  };

const isFirebaseConnected = () => {
  const firebaseApps = getApps();
  return firebaseApps.length > 0;
};

console.log("Is Firebase connected:", isFirebaseConnected());
  
   const FIREBASE_APP = initializeApp(firebaseConfig);
   const auth = getAuth(FIREBASE_APP);
   const db = getFirestore(FIREBASE_APP);
   const storage = getStorage(FIREBASE_APP);




   export { FIREBASE_APP , auth , db ,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged , setDoc , doc , where , query , collection , getDocs   , deleteDoc , updateDoc , increment , getDoc  , signOut , orderBy ,limit , updatePassword  , updateProfile , fetchSignInMethodsForEmail , storage , ref , getDownloadURL , uploadBytes , refFromURL, deleteObject  }