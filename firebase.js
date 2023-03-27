// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT4PYs5QU5hNNdpMBltgmAwwsV6tJ7e0Q",
  authDomain: "comma-project-b3968.firebaseapp.com",
  projectId: "comma-project-b3968",
  storageBucket: "comma-project-b3968.appspot.com",
  messagingSenderId: "726649373615",
  appId: "1:726649373615:web:af5caee5e4d894673b655a",
  measurementId: "G-8PKC1ST1N7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
//const analytics = getAnalytics(app);

export { app, db, storage };