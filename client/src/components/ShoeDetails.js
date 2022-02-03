import React from "react";
import { graphql } from "react-apollo";
import { getShoeQuery } from "./../queries/queries";

const ShoeDetails = props => {
  //console.log(props.shoeId.Id);

  const getShoeDetails = () => {
    const { Shoe } = props.data;
    //console.log(shoe);
    if (Shoe) {
      return (
        <div>
          <h2>{Shoe.ShoeName}</h2>
          <p>model : {Shoe.model}</p>
          <p>company : {Shoe.company}</p>
          <p>owner : {Shoe.owner.name}</p>
          <p>All shoes by this owner :</p>
          <ul>
            {Shoe.owner.shoe.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No Shoe Selected</div>;
    }
  };

  return <div id="shoeDetails">{getShoeDetails()}</div>;
};


//Passing shoeId in getCarQuery 
export default graphql(getShoeQuery, {
  options: props => {
    return {
      variables: {
        id: props.shoeId.Id
      }
    };
  }
})(ShoeDetails);