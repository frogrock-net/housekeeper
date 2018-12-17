import { ApolloServer } from 'apollo-server-express';
import { readdirSync, statSync } from 'fs';
import path from 'path';
import { GQL_TYPE_MUTATION, GQL_TYPE_QUERY, GQL_TYPE_TYPEDEF } from './resources/gql';

const TYPES = {
    [GQL_TYPE_TYPEDEF]: [],
    [GQL_TYPE_QUERY]: [],
    [GQL_TYPE_MUTATION]: [],
};

const RESOLVERS = {
    Query: {},
    Mutation: {},
};

//
// Iterate through each directory in the server/js/resources/ folder, looking for 'resolver.js' files.
//
// If found, pulls each exported function from the 'resolver.js' file and sorts them as a 'type', 'query', or 'mutation'.
//
// Uses these to build the GraphQL server.
//
const dirs = p => readdirSync(p).filter(f => statSync(path.join(p, f)).isDirectory());
dirs(`${__dirname}/resources`).forEach(dir => {
    try {
        const resolvers = require(`./resources/${dir}/resolvers`);

        Object.entries(resolvers).forEach(([name, resolver]) => {
            const n = resolver.name || name;
            switch (resolver.type) {
                case GQL_TYPE_MUTATION:
                    TYPES[GQL_TYPE_MUTATION].push(resolver.def);
                    RESOLVERS.Mutation[n] = resolver.func;
                    break;
                case GQL_TYPE_TYPEDEF:
                    TYPES[GQL_TYPE_TYPEDEF].push(resolver.defs);
                    break;
                case GQL_TYPE_QUERY:
                    TYPES[GQL_TYPE_QUERY].push(resolver.def);
                    RESOLVERS.Query[n] = resolver.func;
                    break;
            }
        });
        console.info(`✅ Loaded resolvers for resource: ${dir}.`);
    } catch (e) {
        console.error(`❌ Error: can't find 'resolvers' module in resource folder: ${dir}.`);
        console.error(`\t- ${e.message}`);
    }
});

const queryTypeDefs = `
    scalar DateTime

    type Query {
        ${TYPES[GQL_TYPE_QUERY].join(',\n\t')}
    }

    type Mutation {
        ${TYPES[GQL_TYPE_MUTATION].join(',\n\t')}
    }
`;

/**
 * Create the ApolloServer from the dynamically-generated typeDefs, Queries, and Mutations.
 */
const schema = new ApolloServer({
    typeDefs: [...TYPES[GQL_TYPE_TYPEDEF], queryTypeDefs],
    resolvers: RESOLVERS,
    context: ({ req }) => ({ jwt: req.jwt }),
});

export default schema;
