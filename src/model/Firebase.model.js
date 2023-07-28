// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYjmkgW9LxwU5IOH_IcEgYsx8qHRYuST4",
  authDomain: "jarvis-tech-portfolio.firebaseapp.com",
  databaseURL: "https://jarvis-tech-portfolio.firebaseio.com",
  projectId: "jarvis-tech-portfolio",
  storageBucket: "jarvis-tech-portfolio.appspot.com",
  messagingSenderId: "798393414596",
  appId: "1:798393414596:web:a7ab2d4179f11492a72a91",
  measurementId: "G-JJYH05QX5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);