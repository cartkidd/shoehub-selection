import React from "react";
import { getOwnersQuery } from "./../queries/queries";
import { graphql } from "react-apollo";

const AddShoe = props => {
  const getOwners = () => {
    var data = props.data;
    if (data.loading) {
      return <option disabled>Owner loading...</option>;
    } else {
      return data.owners.map(owner => {
        return (
          <option key={owner.id} value={owner.id}>
            {owner.name}
          </option>
        );
      });
    } //esle ends here
  };

  return (
    <>
      <form>
        <div className="field">
          <label>Shoe Name</label>
          <input type="text" name="shoeName"></input>
        </div>
        <div className="field">
          <label>Model</label>
          <input type="number" name="model"></input>
        </div>
        <div className="field">
          <label>Company:</label>
          <input type="text" name="company"></input>
        </div>
        <div className="field">
          <label>Owner:</label>
          <select>
            <option>Select Owner</option>
            {getOwners(props)}
          </select>
        </div>
        <button>AddShoe</button>
      </form>
    </>
  );
};

export default graphql(getOwnersQuery)(AddShoe);
