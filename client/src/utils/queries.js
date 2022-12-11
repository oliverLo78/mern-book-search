import { gql } from '@apollo/client';

export const GET_ME = gql`
  query allme {
    me {
      _id
      name
      skills
    }
  }
`;
