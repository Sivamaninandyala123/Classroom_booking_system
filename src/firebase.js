// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQIzStjDFqZEXv1ropX_hV62R77JOz6fw",
  authDomain: "auth-a5fc3.firebaseapp.com",
  projectId: "auth-a5fc3",
  storageBucket: "auth-a5fc3.appspot.com",
  messagingSenderId: "510219704126",
  appId: "1:510219704126:web:7ed4f7b316f83c46dd7e6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

const useAuth = () => {
  // Define your authentication logic here if needed
  return { currentUser: auth.currentUser }; // Example implementation
};
export {db,auth,useAuth}
