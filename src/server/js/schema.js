import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import * as houseSchema from './resources/houses/schema';
import * as roomSchema from './resources/rooms/schema';
import * as userSchema from './resources/users/schema';

// This base Query type is meant to be extended in each model schema.
// An empty Query is not allowed, need to use a fake empty field.
const queryTypeDefs = `
    type Query {
        _empty: String
    }
`;

const schema = makeExecutableSchema({
    typeDefs: [
        queryTypeDefs,
        houseSchema.typeDefs,
        roomSchema.typeDefs,
        userSchema.typeDefs,
    ],
    resolvers: merge(
        houseSchema.resolvers,
        roomSchema.resolvers,
        userSchema.resolvers
    ),
});

export default schema;
