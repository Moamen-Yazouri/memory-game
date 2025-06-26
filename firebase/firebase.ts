// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABghg96ce4abMAcgdQpoZ6oYA3yoy1d0Q",
  authDomain: "memory-game-9251b.firebaseapp.com",
  projectId: "memory-game-9251b",
  storageBucket: "memory-game-9251b.firebasestorage.app",
  messagingSenderId: "404296278107",
  appId: "1:404296278107:web:ecfc6a07ae07ffadb89f7e",
  measurementId: "G-KWCBYLL2Z5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);