import { Button } from "@mui/material";
import React, { useState } from "react";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import GoogleIcon from "@mui/icons-material/Google";
import { signUp, signUpGoogle } from "../../utils/functions";
import { auth } from "../../utils/firebaseConfig";
import axios from "axios";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    signUp(auth, email, password);
  };

  const handleSignUpGoogle = () => {
    signUpGoogle(auth);
    axios.post("http://localhost:3000/api/user")
    .then(res=>console.log(res.data))
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
