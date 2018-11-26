import { concat, filter } from 'lodash';

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
        addAdministratorToHouse(administratorId: ID!, houseId: ID!): House,
        createHouse(name: String!, street: String, city: String, state: String, zip: String): House,
        deleteHouse(houseId: ID!): House,
        updateHouse(houseId: ID!, name: String, street: String, city: String, state: String, zip: String): House,
    }
`;

const isAdmin = (userId, house) => filter(house.administrators, admin => admin == userId);

const resolvers = {
    Query: {
        allHouses: (root, args, context, info) => HouseModel.getAll(),
        housesByAdministrator: (root, args, context, info) => HouseModel.getHousesByAdministrator(args.administratorId),
    },

    Mutation: {
        addAdministratorToHouse: async (_, args, context) => {
            const house = await HouseModel.get(args.houseId).then(house => {
                if (!isAdmin(context.jwt.id, house)) {
                    throw new Error('Only administrators can add administrators to a house.');
                }

                return house;
            });

            const administrators = concat(house.administrators, args.administratorId);
            return HouseModel.update(house, { administrators });
        },

        createHouse: (_, args, context) => {
            const { name, street, city, state, zip } = args;
            const houseData = {
                name,
                address: { street, city, state, zip },
            };

            return HouseModel.create(houseData, context.jwt.id);
        },

        deleteHouse: async (_, args, context) => {
            const house = await HouseModel.get(args.houseId).then(house => {
                if (!isAdmin(context.jwt.id, house)) {
                    throw new Error('Only administrators can delete a house.');
                }

                return house;
            });

            return HouseModel.delete(house);
        },

        updateHouse: async (_, args, context) => {
            const house = await HouseModel.get(args.houseId).then(house => {
                if (!isAdmin(context.jwt.id, house)) {
                    throw new Error('Only administrators can update a house.');
                }

                return house;
            });

            return HouseModel.update(house, args);
        },
    },
};

export { typeDefs, resolvers };
