import HouseModel from './model';

const typeDefs = `
    type Address {
        street: String
        city: String
        state: String
        zip: String
    }

    type House {
        id: ID!
        address: Address
        administrators: [User]
        name: String
    }

    extend type Query {
        allHouses: [House],
        housesByAdministrator(administratorId: ID!): [House],
    }
`;

const resolvers = {
    Query: {
        allHouses: (root, args, context, info) => HouseModel.find().populate('administrators'),
        housesByAdministrator: (root, args, context, info) =>
            HouseModel.find({ administrators: args.administratorId }).populate('administrators'),
    },
};

export { typeDefs, resolvers };
