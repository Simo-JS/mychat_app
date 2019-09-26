import React, { useState } from "react";
import firebase from "../firebase";
import { Email, Lock } from "@material-ui/icons";
import {
  TextField,
  InputAdornment,
  Grid,
  Button,
  Paper,
  Typography,
  Link
} from "@material-ui/core";

const inputStyle = { width: "100%", marginBottom: 10 };

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandle = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(signedInUser => {
        console.log(signedInUser);
      })
      .catch(err => console.log(err));
  };

  return (
    <Grid
      container
      style={{ minHeight: "100vh" }}
      spacing={1}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h4">Sign up to MyChatte</Typography>
        <Paper style={{ padding: 10 }}>
          <form>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              style={inputStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                )
              }}
              value={email}
              onChange={event => {
                setEmail(event.target.value);
              }}
            />
            <br />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              style={inputStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                )
              }}
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
            />

            <br />
            <Button
              style={inputStyle}
              variant="contained"
              color="primary"
              onClick={loginHandle}
            >
              Login
            </Button>
          </form>
        </Paper>
        <Typography variant="h4">
          <Link href="/register">Register</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
