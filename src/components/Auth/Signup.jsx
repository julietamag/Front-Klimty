import { Button } from "@mui/material";
import React, { useState } from "react";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import GoogleIcon from "@mui/icons-material/Google";
import { signUp, signUpGoogle } from "../../utils/functions";
import { auth } from "../../utils/firebaseConfig";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    signUp(auth, email, password);
  };

  const handleSignUpGoogle = () => {
    signUpGoogle(auth);
  };

  return (
    <>
      <EmailInput setEmail={setEmail} />
      <PasswordInput setPassword={setPassword} />

      <Button onClick={handleSignUp} variant="outlined">
        SignUP
      </Button>
      <Button onClick={handleSignUpGoogle} variant="outlined">
        <GoogleIcon /> SignUp with Google
      </Button>
    </>
  );
};
