// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-dc06d.firebaseapp.com",
  projectId: "mern-blog-dc06d",
  storageBucket: "mern-blog-dc06d.appspot.com",
  messagingSenderId: "995395780326",
  appId: "1:995395780326:web:8a9c3278879fbc950c0527",
  measurementId: "G-Z2B6FXK0HN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);