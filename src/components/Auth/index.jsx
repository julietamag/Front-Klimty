import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import GoogleIcon from "@mui/icons-material/Google";
import { auth } from "../../utils/firebaseConfig";
import { signUp, logIn, signUpGoogle } from "../../utils/functions";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUid } from "../../state/uid";

const Auth = () => {
  const uid = useSelector(state=>state.uid)
  const dispath= useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    signUp(auth, email, password);
  };

  const handleSignUpGoogle = () => {
    signUpGoogle(auth);
  };

  const handleLogin = () => {
    logIn(auth, email, password);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispath(setUid(user?.uid));
    });
  }, []);

  return (
    <>
    {console.log(uid)}
        <EmailInput setEmail={setEmail} />
        <PasswordInput setPassword={setPassword} />
        <Button onClick={handleSignUp} variant="outlined">
          SignUP
        </Button>
        <Button onClick={handleLogin} variant="outlined">
          LogIn
        </Button>
        <Button onClick={handleSignUpGoogle} variant="outlined">
          <GoogleIcon /> SignUp with Google
        </Button>
    </>
  );
};

export default Auth;
