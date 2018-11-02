import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import HealthModel from './resources/health/model';
import { typeDefs as Health } from './resources/health/schema';
import HouseModel from './resources/houses/model';
import { typeDefs as House } from './resources/houses/schema';
import UserModel from './resources/users/model';
import { typeDefs as User } from './resources/users/schema';

const queryTypeDefs = `
    type Query {
        allHouses: [House],
        allUsers: [User],
        userByEmail(email: String): User,
        healthCheck: [Health]
    }
`;

const queryResolvers = {
    Query: {
        allHouses: (root, args, context, info) =>
            HouseModel.find().populate('administrators'),
        allUsers: (root, args, context, info) => UserModel.find(),
        userByEmail: (root, args, context, info) =>
            UserModel.findOne({ email: args.email }),
        healthCheck: (root, args, context, info) => HealthModel.find(),
    },
};

const schema = makeExecutableSchema({
    typeDefs: [queryTypeDefs, House, User, Health],
    resolvers: merge(queryResolvers),
});

export default schema;
