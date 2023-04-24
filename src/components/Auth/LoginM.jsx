import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { logIn, signUpGoogle, forgotPassword } from "../../utils/functions";
import { auth } from "../../utils/firebaseConfig";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";

export const LoginM = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleLogIn = (e) => {
    e.preventDefault();
    logIn(auth, email, password, () => navigate('/'));
  };
  const handleSignUpGoogle = () => {
    signUpGoogle(auth, () => navigate('/'))
  };


  const handleFPassword = (e) => {
    e.preventDefault();
    forgotPassword(auth, email);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogIn} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogIn}
          >
            Login
          </Button>
          <Button
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            onClick={handleSignUpGoogle}
            variant="outlined"
            startIcon={  <GoogleIcon />}
          >
           Login with Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                onClick={(e) => handleFPassword(e)}
                href="#"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Register"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
