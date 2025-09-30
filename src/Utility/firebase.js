
import firebase from "firebase/compat/app";
// auth
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB19C0ieO2D9zrQqqqScKPi8rqP8wA7UAI",
  authDomain: "clone-2025-db20f.firebaseapp.com",
  projectId: "clone-2025-db20f",
  storageBucket: "clone-2025-db20f.firebasestorage.app",
  messagingSenderId: "646574703496",
  appId: "1:646574703496:web:4264571a0308d2726a703d",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();