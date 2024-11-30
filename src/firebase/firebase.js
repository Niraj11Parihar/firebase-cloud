// firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdJBy15t4ws__oJLqJc86Uu2UX16ljEKE",
  authDomain: "fir-cloud-dd814.firebaseapp.com",
  projectId: "fir-cloud-dd814",
  storageBucket: "fir-cloud-dd814.appspot.com",
  messagingSenderId: "65248255899",
  appId: "1:65248255899:web:e1d8edad3eea669f628b3e",
  measurementId: "G-E0KB700CGM",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
