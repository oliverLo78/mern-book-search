import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser() {
    me {
      _id
      name
    }
  }
`;
