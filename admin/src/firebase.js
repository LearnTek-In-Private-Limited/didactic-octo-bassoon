import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"; // ✅ Import Storage
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyC6dbehEp7W1xLcy_mKajeAxwEMAJkCR1Y",
  authDomain: "learntekin-965be.firebaseapp.com",
  databaseURL: "https://learntekin-965be-default-rtdb.firebaseio.com",
  projectId: "learntekin-965be",
  storageBucket: "learntekin-965be.firebasestorage.app",
  messagingSenderId: "224295322327",
  appId: "1:224295322327:web:ec1d3510d9edea31eae692",
  measurementId: "G-SVGP60V5TL"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth(app);
const db = app.firestore();
const storage = firebase.storage(); // ✅ Correctly initialize Storage

console.log("Firebase initialized");

export { db, storage, auth };
export default firebase;
