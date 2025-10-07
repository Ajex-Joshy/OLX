// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVCLgikdbAOlIElBpPLYVhnBCjaQegPQk",
  authDomain: "olx-e2ab5.firebaseapp.com",
  projectId: "olx-e2ab5",
  storageBucket: "olx-e2ab5.firebasestorage.app",
  messagingSenderId: "963774171453",
  appId: "1:963774171453:web:fa9a7893c140d3c5195d54",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
