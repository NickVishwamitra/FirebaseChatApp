import LoginScreen from "./LoginScreen/LoginScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import SignUp from "./SignUpPage/SignUp";
import { Fragment, useEffect, useState } from "react";
import Dashboard from "./Dashboard/Dashboard";
import { Button } from "@mui/material";
import LoadingScreen from "./LoadingScreen";
import { getAuth } from "@firebase/auth";

const Mobile = () => {
  const history = useHistory();

  const handleSignUpOnClick = () => {
    history.push("/signup");
    history.go(0);
  };
  const handleLoginOnClick = () => {
    history.push(`/dashboard`);
  };
  const [userId, setUserId] = useState("");
  // useEffect(() => setUserId(String(auth.currentUser?.uid)));
  return (
    <div>
      <Route exact path="/">
        {true ? (
          <Fragment>
            <Dashboard></Dashboard>
          </Fragment>
        ) : (
          <LoginScreen
            handleSignUpOnClick={handleSignUpOnClick}
            handleLoginOnClick={handleLoginOnClick}
          />
        )}
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/login">
        <LoginScreen handleSignUpOnClick={handleSignUpOnClick} />
      </Route>
      <Route path={`/dashboard`}>
        <Dashboard />
      </Route>
    </div>
  );
};

export default Mobile;
