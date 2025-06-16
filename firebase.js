// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATOjS-6z1JsTmwhPbSW3oSJatZ_xCzRcU",
  authDomain: "stydyhub-76c5e.firebaseapp.com",
  projectId: "stydyhub-76c5e",
  storageBucket: "stydyhub-76c5e.firebasestorage.app",
  messagingSenderId: "49331157490",
  appId: "1:49331157490:web:41f6656917eed5bdcad36b",
  measurementId: "G-NM28RDBRQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);