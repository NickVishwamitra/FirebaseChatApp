import "./LoginScreen.scss";
import * as React from "react";
import * as Realm from "realm-web";

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

import SignUp from "../SignUpPage/SignUp";
import assert from "assert";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

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

  const [email, setEmail] = useState("");
  const passwordForm = useRef<any>();

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const realmApp: Realm.App = Realm.App.getApp("application-0-nukle");

  const history = useHistory();
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  console.log(realmApp.currentUser);
  const SubmitHandler = async () => {
    const credentials = Realm.Credentials.emailPassword(
      emailForm.current!.value,
      passwordForm.current!.value
    );

    try {
      // Authenticate the user
      await realmApp.logIn(credentials);

      history.push("/dashboard");
      history.go(0);
    } catch (err) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
    }
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
        <Button
          className="submit"
          style={{ marginBottom: "10%" }}
          variant="contained"
          onClick={SubmitHandler}
        >
          Submit
        </Button>
        <p style={{ color: "#FFF" }}>Don't have an account?</p>

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
