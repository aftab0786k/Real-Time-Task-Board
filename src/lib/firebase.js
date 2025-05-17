// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
   apiKey: "AIzaSyC12HGBqVC8mmIQZC37e5zIoniAEvIr2C4",
  authDomain: "chat-application-1c381.firebaseapp.com",
  databaseURL: "https://chat-application-1c381-default-rtdb.firebaseio.com",
  projectId: "chat-application-1c381",
  storageBucket: "chat-application-1c381.firebasestorage.app",
  messagingSenderId: "300042727886",
  appId: "1:300042727886:web:d4562d29f9a6a9d48b7b9f",
  measurementId: "G-B4TZHTKNJM",
  // Realtime Database URL
  databaseURL: "https://chat-application-1c381-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export { app, auth, firestore, database, analytics };