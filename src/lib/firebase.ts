import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyHsH3wT8Ug9Ww7q6JmdNbMNJIPwxg19Y",
  authDomain: "aviflu-4cf44.firebaseapp.com",
  projectId: "aviflu-4cf44",
  storageBucket: "aviflu-4cf44.firebasestorage.app",
  messagingSenderId: "955127366983",
  appId: "1:955127366983:web:0092b2add0a1ca4c563862",
  measurementId: "G-ZXW84KFPJ4"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);