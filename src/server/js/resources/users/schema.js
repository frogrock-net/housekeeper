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
        createUser(email: String, firstName: String, lastName: String, password: String): User
    }
`;

const resolvers = {
    Query: {
        allUsers: (root, args, context, info) => UserModel.find(),
        userByEmail: (root, args, context, info) =>
            UserModel.findOne({ email: args.email }),
    },

    Mutation: {
        createUser: (root, args) => {
            const { email, firstName, lastName, password } = args;
            const user = UserModel({ email, firstName, lastName });
            user.setPassword(password);

            user.save(err => {
                if (err) {
                    next(err);
                }
            });

            return user;
        },
    },
};

export { typeDefs, resolvers };
