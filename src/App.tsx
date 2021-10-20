import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useMediaQuery } from "react-responsive";
import MediaQuery from "react-responsive";
import { RealmAppProvider } from "./RealmApp";
import Mobile from "./Mobile/Mobile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  withRouter,
} from "react-router-dom";
var CryptoJS = require("crypto-js");
export const APP_ID = "application-0-nukle";
function App() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  return (
    <Router>
      <RealmAppProvider appId={APP_ID}>
        <div>
          <Mobile />
        </div>
      </RealmAppProvider>
    </Router>
  );
}

export default App;
