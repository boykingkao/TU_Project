const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDiZHjh6ikdCjPyShotpUT86PvXDhhzqs0",
  authDomain: "tu-project-shop.firebaseapp.com",
  projectId: "tu-project-shop",
  storageBucket: "tu-project-shop.appspot.com",
  messagingSenderId: "188725849603",
  appId: "1:188725849603:web:96deec39a6ac194fc96836",
  measurementId: "G-G90Y4VVD53"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products_col = collection(db, "products");

// const wow = () => 50

function wow () {
  return 100}


module.exports = { db, products_col , wow};
