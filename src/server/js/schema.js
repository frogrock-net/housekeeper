import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import HealthModel from './resources/health/model';
import { typeDefs as Health } from './resources/health/schema';
import UserModel from './resources/users/model';
import { typeDefs as User } from './resources/users/schema';

const queryTypeDefs = `
    type Query {
        allUsers: [User],
        userByEmail(email: String): User,
        healthCheck: [Health]
    }
`;

const queryResolvers = {
    Query: {
        allUsers: (root, args, context, info) => UserModel.find(),
        userByEmail: (root, args, context, info) =>
            UserModel.findOne({ email: args.email }),
        healthCheck: (root, args, context, info) => HealthModel.find(),
    },
};

const schema = makeExecutableSchema({
    typeDefs: [queryTypeDefs, User, Health],
    resolvers: merge(queryResolvers),
});

export default schema;
