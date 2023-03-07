
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBFGJRkS0dNDOSYjj0ZtTAh4-TbIsQFesI",
  authDomain: "klimty-93d1f.firebaseapp.com",
  projectId: "klimty-93d1f",
  storageBucket: "klimty-93d1f.appspot.com",
  messagingSenderId: "197007393503",
  appId: "1:197007393503:web:1053a978d8ce2717e7df6a",
  measurementId: "G-64473D3Q3W"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
