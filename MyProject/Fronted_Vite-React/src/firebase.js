// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiZHjh6ikdCjPyShotpUT86PvXDhhzqs0",
  authDomain: "tu-project-shop.firebaseapp.com",
  projectId: "tu-project-shop",
  storageBucket: "tu-project-shop.appspot.com",
  messagingSenderId: "188725849603",
  appId: "1:188725849603:web:96deec39a6ac194fc96836",
  measurementId: "G-G90Y4VVD53"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const products = collection(db, "products");
const users = collection(db, "users")
const message = collection(db, "message")

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, products, users, message, auth, provider }

