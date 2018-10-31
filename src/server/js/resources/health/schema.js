import HealthModel from './model';

const typeDefs = `
    type HealthModel {
        id: ID!
        checkedOn: String
    }

    type Query {
        healthChecks: [HealthModel]
        health(id: ID!): HealthModel
    }
`;

const resolvers = {
    Query: {
        healthChecks: (root, args, context, info) => {
            return HealthModel.find({});
        },
        health: (root, args, context, info) => {
            return HealthModel.findById(args.id);
        },
    },
};

export { typeDefs, resolvers };
