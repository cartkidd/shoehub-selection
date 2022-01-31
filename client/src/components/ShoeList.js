import React from "react";
import { graphql } from "react-apollo";
import getShoesQuery from "./../queries/queries";

const ShoeList = props => {
  console.log(props); //check in the browser to see this values.
  return (
    <>
      <ul id="shoeList">
        <li>ShoeName</li>
      </ul>
    </>
  );
};

export default graphql(getShoesQuery)(ShoeList); //HOC