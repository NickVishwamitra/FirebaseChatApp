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
import { useRealmApp } from "../RealmApp";
import { useState } from "react";
import Dashboard from "./Dashboard/Dashboard";
import { Button } from "@mui/material";
const Mobile = () => {
  const realmApp = useRealmApp();
  console.log(realmApp.currentUser);
  const history = useHistory();
  const handleSignUpOnClick = () => {
    history.push("/signup");
    history.go(0);
  };
  const handleLoginOnClick = () => {
    history.push(`/dashboard/${realmApp.currentUser!.id}`);
  };
  const [userId, setUserId] = useState("");

  return (
    <div>
      <Route exact path="/">
        {realmApp.currentUser ? (
          <Dashboard></Dashboard>
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
        <Dashboard></Dashboard>
      </Route>
    </div>
  );
};

export default Mobile;
