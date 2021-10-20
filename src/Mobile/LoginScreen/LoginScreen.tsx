import "./LoginScreen.css";
import * as React from "react";
import * as Realm from "realm-web";

import { Icon, Intent } from "@blueprintjs/core";
import { Popover2, Tooltip2 } from "@blueprintjs/popover2";
import { useCallback, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl, { useFormControl } from "@mui/material/FormControl";

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

  const SubmitHandler = async () => {
    const credentials = Realm.Credentials.emailPassword(
      emailForm.current!.value,
      passwordForm.current!.value
    );

    try {
      // Authenticate the user
      const user: Realm.User = await realmApp.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      assert(user.id === realmApp.currentUser!.id);
      history.go(0);
      return user;
    } catch (err) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
    }
  };

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
        <TextField
          autoFocus={false}
          variant="standard"
          label="Email"
          InputLabelProps={{
            className: "inputfield",
            style: { color: "#fff" },
          }}
          inputRef={emailForm}
          onKeyPress={(e: any) => {
            e.key == "Enter" ? SubmitHandler() : console.log("");
          }}
        ></TextField>
        <TextField
          variant="standard"
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
        ></TextField>
        <Button
          className="submit"
          style={{ marginBottom: "30%" }}
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
