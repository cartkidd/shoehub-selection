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

export { getShoesQuery, getOwnersQuery };



