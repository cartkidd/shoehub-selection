
import React from "react";
import { getOwnersQuery } from "./../queries/queries";
import { graphql } from "react-apollo";
import { HandleFormHook}  from "./../hooks/handleFormHook";

const AddShoe = props => {
  const getFormData = () => {
    console.log(`${inputs}`);
  };

  const { inputs, handleInputChange, handleSubmit } = HandleFormHook(
    getFormData
  );

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
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Shoe Name</label>
          <input
            type="text"
            name="carName"
            onChange={handleInputChange}
            value={inputs.shoeName}
          ></input>
        </div>
        <div className="field">
          <label>Model</label>
          <input
            type="number"
            name="model"
            onChange={handleInputChange}
            value={inputs.model}
          ></input>
        </div>
        <div className="field">
          <label>Company:</label>
          <input
            type="text"
            name="company"
            onChange={handleInputChange}
            value={inputs.company}
          ></input>
        </div>
        <div className="field">
          <label>Owner:</label>
          <select
            name="owner"
            onChange={handleInputChange}
            value={inputs.owner}
          >
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
