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
`;

const resolvers = {
    Query: {
        allUsers: (root, args, context, info) => UserModel.find(),
        userByEmail: (root, args, context, info) =>
            UserModel.findOne({ email: args.email }),
    },
};

export { typeDefs, resolvers };
