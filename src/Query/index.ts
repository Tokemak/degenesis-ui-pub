import { gql } from '@apollo/client';

export const TOTAL_COMMITMENT = gql`
  subscription ($contractAddress: String!) {
    contracts(where: { id: $contractAddress }) {
      id
      balances {
        id
        address
        token {
          id
          total
        }
      }
      depositsOpen
      withdrawalsOpen
      privateFarmingOpen
    }
  }
`;

export const USER_COMMITMENT = gql`
  subscription ($userAddress: String!) {
    user(id: $userAddress) {
      id
      balances {
        id
        address
        token {
          id
        }
        total
      }
    }
  }
`;
