import UserModel from './model';

const typeDefs = `
    type User {
        id: ID!
        email: String
        firstName: String
        lastName: String
    }
`;

export { typeDefs };
