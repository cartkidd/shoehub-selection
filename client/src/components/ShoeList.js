import React from "react";
import { graphql } from "react-apollo";
import { getShoesQuery } from "./../queries/queries";
import ShoeDetails from "./ShoeDetails";

const ShoeList = props => {
  console.log(props);
  const [Id, setShoe] = React.useState(0);

  const displayShoes = () => {
    var data = props.data;
    if (data.loading) {
      return <div>Loading Shoes...</div>;
    } else {
      return data.shoes.map(shoe => {
        return (
          <li key={shoe.id} onClick={e => setShoe({ Id: shoe.id })}>
            {shoe.name}
          </li>
        );
      });
    }
  };

  return (
    <>
      <ul id="shoeList">{displayShoes()}</ul>
      <ShoeDetails shoeId={Id}></ShoeDetails>
    </>
  );
};

export default graphql(getShoesQuery)(ShoeList);