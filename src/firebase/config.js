import app from 'firebase/app';
import firebase from 'firebase';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdYlmV4kt9M1rxk69iAzUKrjnFUisGH8I",
  authDomain: "clase10-10ef3.firebaseapp.com",
  projectId: "clase10-10ef3",
  storageBucket: "clase10-10ef3.appspot.com",
  messagingSenderId: "176576518202",
  appId: "1:176576518202:web:6ea53dd3bc77f2b01cfd03"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();