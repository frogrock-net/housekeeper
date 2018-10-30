import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import {
    typeDefs as Health,
    resolvers as healthResolvers,
} from './resources/health/schema';

const schema = makeExecutableSchema({
    typeDefs: [Health],
    resolvers: merge(healthResolvers),
});

export default schema;
