
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { useEffect } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyDI34cnmLIBgAt-Ae-zUipXtdULnSeh5C4",
  authDomain: "phonauth-bc923.firebaseapp.com",
  projectId: "phonauth-bc923",
  storageBucket: "phonauth-bc923.appspot.com",
  messagingSenderId: "111736242560",
  appId: "1:111736242560:web:5d8dee292fc8c4fa574165",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();


