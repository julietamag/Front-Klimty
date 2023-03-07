import {  createUserWithEmailAndPassword,sendEmailVerification ,
    signInWithEmailAndPassword,
    onAuthStateChanged ,signInWithPopup,signOut  } from "firebase/auth";
import { provider } from "./firebaseConfig";

export const signUp=(auth,email,password)=>{
    createUserWithEmailAndPassword(auth, email, password)
    .then(res=>{
        sendEmailVerification(res.user.auth.currentUser)
    })

}

export const logIn=(auth,email,password)=>{
    signInWithEmailAndPassword(auth, email, password)
    .then(res=>{
        onAuthStateChanged(auth, (user)=>{
  if(!user.emailVerified){
    sendEmailVerification(user.auth.currentUser)
    alert("your email is not verified")}
        })
    
    })
}

export const signUpGoogle=(auth)=>{
    signInWithPopup(auth, provider)
}
export const logOut=(auth)=>{
    signOut(auth)
}