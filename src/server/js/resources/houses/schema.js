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
        administrators: [String]
        name: String
    }

    extend type Query {
        allHouses: [House],
        housesByAdministrator(administratorId: ID!): [House],
    }

    extend type Mutation {
        createHouse(name: String!, street: String, city: String, state: String, zip: String): House,
    }
`;

const resolvers = {
    Query: {
        allHouses: (root, args, context, info) => HouseModel.getAll(),
        housesByAdministrator: (root, args, context, info) => HouseModel.getHousesByAdministrator(args.administratorId),
    },

    Mutation: {
        createHouse: (root, args, context, info) => {
            const { name, street, city, state, zip } = args;
            const houseData = {
                name,
                address: { street, city, state, zip },
            };

            return HouseModel.createHouse(houseData, context.jwt.id);
        },
    },
};

export { typeDefs, resolvers };
