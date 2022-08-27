import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAC4vws8t7pUltuqk2q_iwPAsE5ger7fLY",
  authDomain: "test-blog-2b9fd.firebaseapp.com",
  projectId: "test-blog-2b9fd",
  storageBucket: "test-blog-2b9fd.appspot.com",
  messagingSenderId: "345056657107",
  appId: "1:345056657107:web:b1fb4650d6596e8de51e26"
};


const app = initializeApp(firebaseConfig); 

export const db = getFirestore(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
