// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-41w1hu3yyP-6NFQpuhi2LimecpCHzQk",
  authDomain: "hahaflix-f06f0.firebaseapp.com",
  projectId: "hahaflix-f06f0",
  storageBucket: "hahaflix-f06f0.appspot.com",
  messagingSenderId: "960194329510",
  appId: "1:960194329510:web:6ce0876a27aad832d66d67",
  measurementId: "G-QNPHM454H4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);