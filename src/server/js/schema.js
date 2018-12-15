import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import * as bookingSchema from './resources/bookings/schema';
import * as houseSchema from './resources/houses/schema';
import * as roomSchema from './resources/rooms/schema';
import * as userSchema from './resources/users/schema';

// This base Query and Mutation types are meant to be extended in each model schema.
// An empty Query/Mutation cannot be extended, need to use a fake empty field.
const queryTypeDefs = `
    scalar DateTime

    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

const schema = makeExecutableSchema({
    typeDefs: [queryTypeDefs, bookingSchema.typeDefs, houseSchema.typeDefs, roomSchema.typeDefs, userSchema.typeDefs],
    resolvers: merge(bookingSchema.resolvers, houseSchema.resolvers, roomSchema.resolvers, userSchema.resolvers),
});

export default schema;

/*
import { readdirSync, statSync } from 'fs';

const dirs = p => readdirSync(p).filter(f => statSync(path.join(p, f)).isDirectory());


dirs(`${__dirname}/resources`).forEach(dir => {
    const api = require(`./resources/${dir}`).default;
    console.log(`\tLoading API resource: ${dir}`);
    app.use(`/api/${dir}`, api);
});
 */
