import "./App.css";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { RealmAppProvider, useRealmApp } from "./RealmApp";
import Mobile from "./Mobile/Mobile";
import { BrowserRouter as Router } from "react-router-dom";
import * as Realm from "realm-web";
import { createRealmApolloClient } from "./RealmApolloProvider";
import { ApolloProvider, gql, useQuery } from "@apollo/client";

var CryptoJS = require("crypto-js");

export const APP_ID = "application-0-nukle";
export const realmApp: Realm.App = Realm.App.getApp("application-0-nukle");

function App(props: any) {
  const [client, setClient] = React.useState(createRealmApolloClient(realmApp));
  React.useEffect(() => {
    setClient(createRealmApolloClient(realmApp));
  }, [realmApp]);

  console.log(client);

  const mongodb = realmApp.currentUser?.mongoClient("messenger");
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Mobile />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
