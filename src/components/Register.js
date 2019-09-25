import React, { useState } from "react";
import firebase from "../firebase";
import md5 from "md5";
import { AccountCircle, Email, Lock, Replay } from "@material-ui/icons";
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

const Register = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const saveUser = ({ uid, displayName, photoURL }) => {
    console.log({ uid, displayName, photoURL });
    firebase
      .database()
      .ref("users")
      .child(uid)
      .set({
        name: displayName,
        avatar: photoURL
      });
  };

  const registerHandle = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        console.log("createdUser", createdUser);
        createdUser.user
          .updateProfile({
            displayName: username,
            photoURL: `https://gravatar.com/avatar/${md5(email)}?d=identicon`
          })
          .then(() => {
            saveUser(createdUser.user);
          });
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
      <Grid item xs={4}>
        <Typography variant="h4">Sign up to MyChatte</Typography>
        <Paper style={{ padding: 10 }}>
          <form>
            <TextField
              label="Username"
              variant="outlined"
              style={inputStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="primary" />
                  </InputAdornment>
                )
              }}
              value={username}
              onChange={event => {
                setUsername(event.target.value);
              }}
            />
            <br />
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
            <TextField
              label="Retype password"
              type="password"
              variant="outlined"
              style={inputStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Replay color="primary" />
                  </InputAdornment>
                )
              }}
              value={confirmPassword}
              onChange={event => {
                setConfirmPassword(event.target.value);
              }}
            />
            <br />
            <Button
              style={inputStyle}
              variant="contained"
              color="primary"
              onClick={registerHandle}
            >
              Register
            </Button>
          </form>
        </Paper>
        <Typography variant="h4">
          <Link href="/login">Login</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Register;
