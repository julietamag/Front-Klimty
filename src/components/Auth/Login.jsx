import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { logIn, signUpGoogle } from "../../utils/functions";
import React, { useState } from "react";
import { auth } from "../../utils/firebaseConfig";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpGoogle = () => {
    signUpGoogle(auth);
  };

  const handleLogin = () => {
    logIn(auth, email, password);
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
