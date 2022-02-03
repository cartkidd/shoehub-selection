//queries.js
import { gql } from "apollo-boost";

const getShoesQuery = gql`
  {
    shoes {
      name
      id
    }
  }
`;

const getOwnersQuery = gql`
  {
    owners {
      name
      id
    }
  }
`;

const AddShoeMutation = gql`
  mutation($ShoeName: String!, $model: Int!, $company: String!, $ownerId: ID!) {
    addShoe(name: $ShoeName, model: $model, company: $company, ownerId: $ownerId) {
      name
      id
    }
  }
`;

const getShoeQuery = gql`
  query($id: ID!) {
    Shoe(id: $id) {
      id
      name
      model
      company
      owner {
        id
        name
        age
        shoe {
          name
          company
          id
        }
      }
    }
  }
`;

export { getShoesQuery, getOwnersQuery, AddShoeMutation, getShoeQuery };



