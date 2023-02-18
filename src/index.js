import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://mr79ng.sse.codesandbox.io/graphql',
    fetchOptions: {
      mode: 'no-cors'
    },
  }),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: "https://mr79ng.sse.codesandbox.io/graphql",
//   cache: new InMemoryCache(),
//   fetchOptions: {
//     mode: "no-cors",
//   },
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
