import LoginScreen from "./LoginScreen/LoginScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import SignUp from "./SignUpPage/SignUp";
import * as Realm from "realm-web";
import { Fragment, useState } from "react";
import Dashboard from "./Dashboard/Dashboard";
import { Button } from "@mui/material";
import LoadingScreen from "./LoadingScreen";

const Mobile = () => {
  const realmApp: Realm.App = Realm.App.getApp("application-0-nukle");

  const history = useHistory();
  const handleSignUpOnClick = () => {
    history.push("/signup");
    history.go(0);
  };
  const handleLoginOnClick = () => {
    history.push(`/dashboard`);
  };
  const [userId, setUserId] = useState("");

  return (
    <div>
      <Route exact path="/">
        {realmApp.currentUser ? (
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
        {realmApp.currentUser ? <Dashboard></Dashboard> : null}
      </Route>
    </div>
  );
};

export default Mobile;
