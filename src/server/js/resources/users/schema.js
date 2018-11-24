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
        loginUser(email: String, password: String): String
    }
`;

const resolvers = {
    Query: {
        allUsers: (root, args, context, info) => UserModel.getAll(),
        userByEmail: (root, args, context, info) => UserModel.getUserByEmail(args.email),
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

            return user.generateToken();
        },

        loginUser: (root, args) => {
            const token = UserModel.findOne({ email: args.email }, (err, user) => {
                if (!user) {
                    throw new Error('User not found!');
                }

                if (!user.validatePassword(args.password)) {
                    throw new Error('Invalid password.');
                }
            }).then(user => user.generateToken());

            return token;
        },
    },
};

export { typeDefs, resolvers };
