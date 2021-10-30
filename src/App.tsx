import "./App.css";
import React from "react";
import { useMediaQuery } from "react-responsive";
import Mobile from "./Mobile/Mobile";
import { BrowserRouter as Router } from "react-router-dom";

var CryptoJS = require("crypto-js");
function App(props: any) {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <Router>
      <div>
        <Mobile />
      </div>
    </Router>
  );
}

export default App;
