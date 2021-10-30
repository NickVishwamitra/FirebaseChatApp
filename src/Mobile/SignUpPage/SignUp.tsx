import { Icon } from "@blueprintjs/core";
import {
  Alert,
  AlertProps,
  Button,
  ButtonProps,
  FormControl,
  FormHelperText,
  Snackbar,
  styled,
  TextField,
  useFormControl,
} from "@mui/material";
import "./SignUp.scss";
import ButtonUnstyled, {
  buttonUnstyledClasses,
  ButtonUnstyledProps,
} from "@mui/core/ButtonUnstyled";
import { ReactComponent as GLogo } from "./GLogo.svg";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Submitted from "./Submitted";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "@firebase/database";
export const GoogleButton = styled("button")(`
  background-color: #FFF;
  padding: 10px 20px;
  border-radius: 20px;
  color: #000;
  display : flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
  font-weight: 600;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color:#C5CBD3;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #004386;
  }

`);

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

const SignUp = () => {
  const [submitted, setIsSubmitted] = useState(false);

  const emailForm = useRef<any>();
  const [open, setOpen] = useState(false);
  const [curError, setError] = useState("");

  const passwordForm = useRef<any>();
  const history = useHistory();

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#FFF",
    height: "12%",
    fontSize: "1.5em",
    backgroundColor: "#00b472",
    "&:hover": {
      backgroundColor: "#008051",
    },
  }));

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const RegisterHandler = () => {
    const tempEmail = emailForm.current!.value;
    const tempPass = passwordForm.current!.value;
    if (!tempEmail && !tempPass) {
      openSnackbar("Please Fill All Fields And Try Again");
    } else if (!tempEmail.includes("@") || !tempEmail.includes(".com")) {
      openSnackbar("Please Enter A Valid Email");
    } else if (tempPass.length < 6) {
      openSnackbar("Password Must Be Greater Than 6 Characters");
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, tempEmail, tempPass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          const db = getDatabase();
          set(ref(db, `userdata/${user.uid}`), {
            email: user.email,
            userid: user.uid,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

      setIsSubmitted(true);
      setTimeout(() => {
        history.push("/login");
        history.go(0);
      }, 4000);
    }
  };

  const openSnackbar = (err: any) => {
    setError(err);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 4000);
  };

  return (
    <div className="signUpPage">
      {submitted ? (
        <Submitted submitted={submitted} />
      ) : (
        <>
          <Icon
            icon="clipboard"
            className="cloud"
            size={110}
            style={{
              position: "absolute",
              fill: "white",
              paddingLeft: "10px",
            }}
          />
          <Icon icon="clipboard" className="cloud" size={110} />
          <p style={{ maxWidth: "90%" }} className="createText">
            Create An Account
          </p>
          <div className="registerArea">
            <div className="form">
              <CssTextField
                required
                inputRef={emailForm}
                label="Email"
                InputLabelProps={{
                  className: "inputfield",
                  style: { color: "#fff" },
                }}
              ></CssTextField>
              <CssTextField
                required
                inputRef={passwordForm}
                label="Password"
                InputLabelProps={{
                  className: "inputfield",
                  style: { color: "#fff" },
                }}
                type="password"
              ></CssTextField>

              <ColorButton className="signUp" onClick={RegisterHandler}>
                Register
              </ColorButton>
              <p style={{ color: "#FFF", margin: 0 }}>Or</p>
              <Button onClick={() => history.push("/")}>
                Log in with email
              </Button>
              <Snackbar open={open} onClose={handleClose}>
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {curError}
                </Alert>
              </Snackbar>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUp;
