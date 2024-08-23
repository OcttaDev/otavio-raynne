import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvnex1a-IxsmIGEpBgaquMkF7MBAZTVoE",
  authDomain: "otavio-raynne.firebaseapp.com",
  projectId: "otavio-raynne",
  storageBucket: "otavio-raynne.appspot.com",
  messagingSenderId: "143672918946",
  appId: "1:143672918946:web:687d8fc1ce4e3b4e74a8fb",
  measurementId: "G-EML3RNGRZS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup, db };
