// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaHT_Y24iugVn1vHGv6OGuqKAQkTm08bM",
  authDomain: "dkhgroup-e3d14.firebaseapp.com",
  projectId: "dkhgroup-e3d14",
  storageBucket: "dkhgroup-e3d14.appspot.com",
  messagingSenderId: "471696573701",
  appId: "1:471696573701:web:9d34a2e9293f1d697da36c",
  measurementId: "G-GQY36K8SH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app)