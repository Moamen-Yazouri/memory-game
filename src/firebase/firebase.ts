import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyABghg96ce4abMAcgdQpoZ6oYA3yoy1d0Q",
  authDomain: "memory-game-9251b.firebaseapp.com",
  projectId: "memory-game-9251b",
  storageBucket: "memory-game-9251b.firebasestorage.app",
  messagingSenderId: "404296278107",
  appId: "1:404296278107:web:ecfc6a07ae07ffadb89f7e",
  measurementId: "G-KWCBYLL2Z5"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
