import HealthModel from './model';

const typeDefs = `
    type Health {
        id: ID!
        checkedOn: String
    }
`;

export { typeDefs };
