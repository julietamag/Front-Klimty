import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import GoogleIcon from "@mui/icons-material/Google";
import { auth } from "../../utils/firebaseConfig";
import { signUp, logIn, signUpGoogle, logOut } from "../../utils/functions";
import { onAuthStateChanged } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUid] = useState("");

  const handleSignUp = () => {
    signUp(auth, email, password);
  };

  const handleSignUpGoogle = () => {
    signUpGoogle(auth);
  };

  const handleLogin = () => {
    logIn(auth, email, password);
  };

  const handleLogOut = () => {
    logOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUid(user?.uid);
    });
  }, []);

  return (
    <>
      {uid ? (
        <Button onClick={handleLogOut} variant="outlined">
          LogOut
        </Button>
      ) : (
        <>
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
      )}
    </>
  );
};

export default Auth;
