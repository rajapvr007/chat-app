// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWJuv9i2osH0tFpxwSngr1vMpWohGvHpE",
  authDomain: "chitchat-16.firebaseapp.com",
  projectId: "chitchat-16",
  storageBucket: "chitchat-16.appspot.com",
  messagingSenderId: "901913499108",
  appId: "1:901913499108:web:ee8397f14e3f97406aa3f1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
