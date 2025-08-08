import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

// Use the project configuration from the service account
const firebaseConfig = {
  apiKey: "AIzaSyDqCCn9Yh8lAyvpltjrqnd4wfcwZby-ur0",
  authDomain: "assigment-c2e5b.firebaseapp.com",
  projectId: "assigment-c2e5b",
  storageBucket: "assigment-c2e5b.firebasestorage.app",
  messagingSenderId: "377093877388",
  appId: "1:377093877388:web:b9a5f479a4e950cad2d5a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

export { db, auth, functions };