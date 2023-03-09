import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { logIn, signUpGoogle } from "../../utils/functions";
import React, { useEffect, useState } from "react";
import { auth } from "../../utils/firebaseConfig";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { onAuthStateChanged } from "firebase/auth";
import { setUid } from "../../state/uid";
import { useDispatch } from "react-redux";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispath = useDispatch();

  const handleSignUpGoogle = () => {
    signUpGoogle(auth)
    onAuthStateChanged(auth, (user) => {
        dispath(setUid(user.uid))
      });
  };

  const handleLogin = () => {
    logIn(auth, email, password)
    onAuthStateChanged(auth, (user) => {
        dispath(setUid(user.uid))
      });
  };


  return (
    <>

     <EmailInput setEmail={setEmail} />
        <PasswordInput setPassword={setPassword} />
      <Button onClick={handleLogin} variant="outlined">
        LogIn
      </Button>
      <Button onClick={handleSignUpGoogle} variant="outlined">
        <GoogleIcon /> SignUp with Google
      </Button>
    </>
  );
};
