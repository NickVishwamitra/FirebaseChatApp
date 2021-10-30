import "./LoginScreen.scss";
import * as React from "react";

import { Icon, Intent } from "@blueprintjs/core";
import { useCallback, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import { Fragment } from "react";
import {
  Button,
  ButtonProps,
  Container,
  FormHelperText,
  OutlinedInput,
  Snackbar,
  styled,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ReactComponent as GLogo } from "../SignUpPage/GLogo.svg";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { initializeApp } from "@firebase/app";

import { GoogleButton } from "../SignUpPage/SignUp";
const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    width: "100%",
    color: "#FFF",
    "&.Mui-focused fieldset": {
      borderColor: "#00fda0",
    },
    "& fieldset": {
      borderColor: "white",
      color: "#FFF",
    },
    "&:hover fieldset": {
      borderColor: "#00fda0",
    },
  },
});

const LoginScreen = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const emailForm = useRef<any>();

  const passwordForm = useRef<any>();

  const history = useHistory();
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const googleSignIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        history.push("/dashboard");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const SubmitHandler = async () => {
    const email = emailForm.current!.value;
    const password = passwordForm.current!.value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        history.push("/dashboard");
        history.go(0);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 4000);
      });
  };

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#FFF",
    height: "10%",
    fontSize: "1.5em",
    backgroundColor: "#008f5a",
    "&:hover": {
      backgroundColor: "#00fda0",
    },
  }));

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div className="loginScreen">
      <Icon
        icon="cloud"
        className="cloud"
        size={110}
        style={{
          position: "absolute",
          fill: "white",
          paddingLeft: "20px",
        }}
      />
      <Icon icon="cloud" className="cloud" size={110} />
      <p className="loginText">Login</p>
      <div className="form">
        <CssTextField
          autoFocus={false}
          label="Email"
          InputLabelProps={{
            className: "inputfield",
            style: { color: "#fff" },
          }}
          inputRef={emailForm}
          onKeyPress={(e: any) => {
            e.key == "Enter" ? SubmitHandler() : console.log("");
          }}
        ></CssTextField>
        <CssTextField
          autoFocus={false}
          label="Password"
          InputLabelProps={{
            className: "inputfield",
            style: { color: "#fff" },
          }}
          type="password"
          inputRef={passwordForm}
          onKeyPress={(e: any) => {
            e.key == "Enter" ? SubmitHandler() : console.log("");
          }}
        ></CssTextField>
        <Button className="submit" variant="contained" onClick={SubmitHandler}>
          Submit
        </Button>
        <GoogleButton onClick={googleSignIn}>
          Sign In With <GLogo></GLogo>
        </GoogleButton>
        <p style={{ color: "#FFF", marginBottom: " 0" }}>
          Don't have an account?
        </p>

        <ColorButton className="signUp" onClick={props.handleSignUpOnClick}>
          SIGN UP
        </ColorButton>
      </div>
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Incorrect Login! Try Again.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginScreen;
