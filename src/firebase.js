import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyDF46M5hyWUJDG1TUhb05iGopWJ0Ad2x5Q",
  authDomain: "unichat-aaeef.firebaseapp.com",
  projectId: "unichat-aaeef",
  storageBucket: "unichat-aaeef.appspot.com",
  messagingSenderId: "713997624693",
  appId: "1:713997624693:web:a20acd6d224cd365239f3c"
}).auth();
