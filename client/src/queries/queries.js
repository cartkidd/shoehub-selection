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
  mutation($name: String!, $model: Int!, $company: String!, $ownerId: ID!) {
    addShoe(name: $name, model: $model, company: $company, ownerId: $ownerId) {
      name
      id
    }
  }
`;

export { getShoesQuery, getOwnersQuery, AddShoeMutation };



