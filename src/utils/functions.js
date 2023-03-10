import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { provider } from "./firebaseConfig";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const signUp = (auth, email, password, name, lastName) => {
  createUserWithEmailAndPassword(auth, email, password).then((res) => {});
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.emailVerified === false) {
        sendEmailVerification(user);
        const { uid } = user;
        axios.post("http://localhost:3001/api/user", {
          name,
          lastName,
          email,
          uid,
        });
        alert("We send you an email to verify it");
        signOut(auth);
      }
    }
  });
};

export const logIn = (auth, email, password) => {
  signInWithEmailAndPassword(auth, email, password).then((res) => {
    if (!res.user.emailVerified) {
      sendEmailVerification(res.user.auth.currentUser);
      alert("your email is not verified");
      signOut(auth);
    } else {
      axios.get("http://localhost:3001/api/user").then((users) => {
        onAuthStateChanged(auth, (userF) => {
          const userFilter = users.data.filter((user) => {
            return user.uid === userF.uid;
          });
          localStorage.setItem("id", userFilter[0].id);
        });
      });
      toast.success("Successfully Logged In !");
    }
  });
};

export const signUpGoogle = (auth) => {
  signInWithPopup(auth, provider);
};

export const logOut = (auth) => {
  signOut(auth);
  localStorage.removeItem("id");
};
