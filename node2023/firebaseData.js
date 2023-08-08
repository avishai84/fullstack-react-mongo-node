
//import { initializeApp } from "firebase/app";
//import { getFirestore, collection, getDocs } from 'firebase/firestore';
const initializeApp = require('firebase/app');
const getFirestore = require('firebase/firestore');
const collection = require('firebase/firestore');
const getDocs = require('firebase/firestore');



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARCC72ddTL-77NHo_5uSCX7D2iU55rFP8",
  authDomain: "animals-50a50.firebaseapp.com",
  projectId: "animals-50a50",
  storageBucket: "animals-50a50.appspot.com",
  messagingSenderId: "939318323667",
  appId: "1:939318323667:web:e321a72ea4b717c2186726"
};

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp);

    const getAnimals = async (db) => {
    const animalsData = collection(db, firebaseConfig["projectId"]);
    const animal = await getDocs(animalsData);
    const animalList = animal.docs.map(doc => doc.data());
    return animalList;
  }