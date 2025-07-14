import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'; // Ensure database is imported
import 'firebase/compat/storage';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6dbehEp7W1xLcy_mKajeAxwEMAJkCR1Y",
    authDomain: "learntekin-965be.firebaseapp.com",
    databaseURL: "https://learntekin-965be-default-rtdb.firebaseio.com",
    projectId: "learntekin-965be",
    storageBucket: "learntekin-965be.appspot.com", // Fixed typo in storageBucket
    messagingSenderId: "224295322327",
    appId: "1:224295322327:web:f6c1bde3f6494a17eae692",
    measurementId: "G-M4C0ZWRMS0"
};

// Initialize Firebase only once
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// Export authentication and database
export const auth = getAuth(app);

export const database = firebase.database(); // ✅ Export database
export const db = firebase.firestore(); 
export default firebase;
