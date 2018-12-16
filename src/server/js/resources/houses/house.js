import gql from 'graphql-tag';

/**
 * Export the 'House' graphql type.
 */
export const House = gql`
    type Address {
        street: String
        city: String
        state: String
        zip: String
    }

    type House {
        id: ID!
        address: Address
        administrators: [String]
        members: [String]
        name: String
        description: String
    }
`;
