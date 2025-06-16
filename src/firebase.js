import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Replace these with your Firebase configuration
  apiKey: "AIzaSyBMDG5K3xxvPnksqr8FJ67GqJ5G3xhRh_Y",
  authDomain: "efendimenu.firebaseapp.com",
  projectId: "efendimenu",
  storageBucket: "efendimenu.firebasestorage.app",
  messagingSenderId: "321820061009",
  appId: "1:321820061009:web:9d9d39d04105a154c2b770",
  measurementId: "G-HMDTMQB3RT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
