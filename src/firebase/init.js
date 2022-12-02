// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRKa1cnFPZG0tDNe7fPWBlxzsSi_oZOLs",
  authDomain: "int305fb087.firebaseapp.com",
  projectId: "int305fb087",
  storageBucket: "int305fb087.appspot.com",
  messagingSenderId: "336941537393",
  appId: "1:336941537393:web:21c3e9f6f5f3d70404e3d0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init firestore service
const db = getFirestore()
export default db;