import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAn1PHFR2O-Ht8vQ7_7aIGqdfh53CPGf_c",
    authDomain: "galeria-premium-caae5.firebaseapp.com",
    projectId: "galeria-premium-caae5",
    storageBucket: "galeria-premium-caae5.firebasestorage.app",
    messagingSenderId: "810055249076",
    appId: "1:810055249076:web:8b1ff505552ce05cfb7be1",
    measurementId: "G-Z69VNHM8DV"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
    db,
    collection,
    getDocs,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    onSnapshot
};
