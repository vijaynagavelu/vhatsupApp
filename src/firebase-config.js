import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB6mkO4butHK1GQFAaJy17wZ68dhdoK8j0",
    authDomain: "authentication-tutorial-718c8.firebaseapp.com",
    projectId: "authentication-tutorial-718c8",
    storageBucket: "authentication-tutorial-718c8.appspot.com",
    messagingSenderId: "350260394733",
    appId: "1:350260394733:web:1992a58d4b66cfa3f3eae4",
    measurementId: "G-LFHDQ8XMNZ"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const db = getFirestore(app);
