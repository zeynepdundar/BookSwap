// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA4sq0w7qmmH3hjQRgOvKpFFtuuUrusD4I",
  authDomain: "book-swap-2d9a5.firebaseapp.com",
  projectId: "book-swap-2d9a5",
  storageBucket: "book-swap-2d9a5.appspot.com",
  messagingSenderId: "657434982358",
  appId: "1:657434982358:web:750dbc1cac26dbf14a5677",
};

// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
