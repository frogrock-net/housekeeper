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
        healthChecks: () => {
            return HealthModel.find()
                .exec()
                .then(healthChecks => {
                    return healthChecks;
                });
        },
        health: id => {
            return HealthModel.findOne();
        },
    },
};

export { typeDefs, resolvers };
