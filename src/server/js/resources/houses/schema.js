import { includes, filter } from 'lodash';

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
        deleteHouse(houseId: ID!): House,
    }
`;

const resolvers = {
    Query: {
        allHouses: (root, args, context, info) => HouseModel.getAll(),
        housesByAdministrator: (root, args, context, info) => HouseModel.getHousesByAdministrator(args.administratorId),
    },

    Mutation: {
        createHouse: (_, args, context) => {
            const { name, street, city, state, zip } = args;
            const houseData = {
                name,
                address: { street, city, state, zip },
            };

            return HouseModel.create(houseData, context.jwt.id);
        },

        deleteHouse: (_, args, context) => {
            const house = HouseModel.get(args.houseId).then(house => {
                if (!filter(house.administrators, admin => admin == context.jwt.id)) {
                    throw new Error('Only administrators can delete a house.');
                }
            });

            const deleted = HouseModel.delete(args.houseId);
            return deleted;
        },
    },
};

export { typeDefs, resolvers };
