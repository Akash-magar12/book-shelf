import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9CYm3mGBdntPk9t6_Ow-RcI596GXEf5Q",
  authDomain: "book-shelf-81064.firebaseapp.com",
  projectId: "book-shelf-81064",
  storageBucket: "book-shelf-81064.firebasestorage.app",
  messagingSenderId: "461871535814",
  appId: "1:461871535814:web:54da3ab03c6699a17fa9c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
