import UserModel from './model';

const typeDefs = `
    type User {
        id: ID!
        email: String
        firstName: String
        lastName: String
    }

    extend type Query {
        allUsers: [User],
        userByEmail(email: String): User,
    }

    extend type Mutation {
        createUser(email: String, firstName: String, lastName: String, password: String): String
        loginUser(email: String!, password: String!): String
    }
`;

const resolvers = {
    Query: {
        allUsers: (root, args, context, info) => UserModel.getAll(),
        userByEmail: (root, args, context, info) => UserModel.getUserByEmail(args.email),
    },

    Mutation: {
        createUser: (root, args) => UserModel.createUser(root, args),
        loginUser: (root, args) => UserModel.loginUser(root, args),
    },
};

export { typeDefs, resolvers };
