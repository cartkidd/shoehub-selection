import React from "react";
import ApolloClient from "apollo-boost"; //connect with our server which is running at backend
import { ApolloProvider } from "react-apollo"; // Connect re

import ShoeList from "./components/ShoeList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <h1>List of Shoes</h1>
      <ShoeList></ShoeList>
    </div>
    </ApolloProvider>
  );
}

export default App;
