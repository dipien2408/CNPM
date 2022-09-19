// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjUqvzuhrxcFJtDMZWyqxI1cN4ZcMGFgw",
  authDomain: "cnpm-30771.firebaseapp.com",
  projectId: "cnpm-30771",
  storageBucket: "cnpm-30771.appspot.com",
  messagingSenderId: "245844549324",
  appId: "1:245844549324:web:81100155ae6a42adebac69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);