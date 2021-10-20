import { Icon } from "@blueprintjs/core";
import {
  Button,
  ButtonProps,
  FormControl,
  FormHelperText,
  styled,
  TextField,
  useFormControl,
} from "@mui/material";
import "./SignUp.css";
import ButtonUnstyled, {
  buttonUnstyledClasses,
  ButtonUnstyledProps,
} from "@mui/core/ButtonUnstyled";
import { ReactComponent as GLogo } from "./GLogo.svg";
import { useEffect, useRef, useState } from "react";
import * as Realm from "realm-web";
import { useHistory } from "react-router-dom";

const GoogleButton = styled("button")(`
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

function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  return <FormHelperText></FormHelperText>;
}
const SignUp = () => {
  const emailForm = useRef<any>();

  const [email, setEmail] = useState("");
  const passwordForm = useRef<any>();
  const history = useHistory();
  const [password, setPassword] = useState("");

  const realmApp: Realm.App = Realm.App.getApp("application-0-nukle");

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
    height: "20%",
    fontSize: "1.5em",
    backgroundColor: "#008f5a",
    "&:hover": {
      backgroundColor: "#00fda0",
    },
  }));

  const RegisterHandler = () => {
    setEmail(emailForm.current!.value);
    setPassword(passwordForm.current!.value);
  };

  useEffect(() => {
    if (email) {
      realmApp.emailPasswordAuth.registerUser(email, password);
    }
  }, [email]);

  return (
    <div className="signUpPage">
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
      <p className="createText">Create An Account</p>
      <div className="registerArea">
        <FormControl className="form">
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
          <p style={{ color: "#FFF" }}>Or</p>
          <Button onClick={() => history.push("/")}>Log in with email</Button>
          <GoogleButton>
            Sign Up With <GLogo></GLogo>
          </GoogleButton>
        </FormControl>
      </div>
    </div>
  );
};

export default SignUp;
