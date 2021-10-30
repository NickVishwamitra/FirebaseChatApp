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
import { child, get, getDatabase, ref } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Mobile = () => {
  const history = useHistory();
  const auth = getAuth();
  const handleSignUpOnClick = () => {
    history.push("/signup");
    history.go(0);
  };

  const [userRegistered, setUserRegistered] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserRegistered(true);
    } else {
    }
  });

  const logout = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        history.push("/login");
      })
      .catch((_error) => {
        history.push("/login");
        history.go(0);
        // An error happened.
      });
    history.push("/login");
  };

  // useEffect(() => setUserId(String(auth.currentUser?.uid)));

  return (
    <div>
      <Route exact path="/">
        {userRegistered ? (
          <Dashboard />
        ) : (
          <LoginScreen handleSignUpOnClick={handleSignUpOnClick} />
        )}
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/login">
        <LoginScreen handleSignUpOnClick={handleSignUpOnClick} />
      </Route>
      <Route path={`/dashboard`}>{userRegistered ? <Dashboard /> : null}</Route>
    </div>
  );
};

export default Mobile;
