import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA3QCFb36mHdBuN1X2V_3HLfyUu8Gqgb4M",
    authDomain: "whatsapp-clone-d9a0b.firebaseapp.com",
    projectId: "whatsapp-clone-d9a0b",
    storageBucket: "whatsapp-clone-d9a0b.appspot.com",
    messagingSenderId: "317027405043",
    appId: "1:317027405043:web:4cf4508ee778c5386bfb86"
  };


  const firebaseApp = initializeApp(firebaseConfig);
  // const db = firebaseApp.firestore();
  const db = getFirestore();
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  export {auth,provider,doc,onSnapshot,collection,query,where};

export default db;