import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// const client = new ApolloClient({
//   uri: "https://realm.mongodb.com/api/client/v2.0/app/application-0-nukle/graphql",
//   cache: new InMemoryCache(),
// });

// client
//   .query({
//     query: gql`
//       query message {
//         _id
//         comment
//         email
//         name
//       }
//     `,
//   })
//   .then((result) => console.log(result));

ReactDOM.render(
  // <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
