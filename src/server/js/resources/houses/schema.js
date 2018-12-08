import { concat, filter, isEmpty, reject } from 'lodash';

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
        members: [String]
        name: String
        description: String
    }

    extend type Query {
        getHouse(houseId: ID!): House,
        allHouses: [House],
        housesByAdministrator(administratorId: ID!): [House],
        housesByMember(memberId: ID!): [House],
    }

    extend type Mutation {
        addAdministratorToHouse(administratorId: ID!, houseId: ID!): House,
        addMemberToHouse(memberId:ID!, houseId: ID!): House,
        createHouse(name: String!, description: String, street: String, city: String, state: String, zip: String): House,
        deleteHouse(houseId: ID!): House,
        removeMemberFromHouse(memberId: ID!, houseId: ID!): House,
        updateHouse(houseId: ID!, name: String, description: String, street: String, city: String, state: String, zip: String): House,
    }
`;

const verifyIsAdmin = (jwt, house, errMsg) => {
    if (!jwt || isEmpty(filter(house.administrators, admin => admin == jwt.id))) {
        throw new Error(errMsg);
    }
};

const resolvers = {
    Query: {
        getHouse: (root, args, context, info) => HouseModel.get(args.houseId),
        allHouses: (root, args, context, info) => HouseModel.getAll(),
        housesByAdministrator: (root, args, context, info) => HouseModel.getHousesByAdministrator(args.administratorId),
        housesByMember: (_, args) => HouseModel.getHousesByMember(args.memberId),
    },

    Mutation: {
        addAdministratorToHouse: async (_, args, context) => {
            const house = await HouseModel.get(args.houseId);
            verifyIsAdmin(context.jwt, house, 'Only administrators can add administrators to a house!');

            const administrators = concat(house.administrators, args.administratorId);
            return HouseModel.update(house, { administrators });
        },

        addMemberToHouse: async (_, args, context) => {
            const house = await HouseModel.get(args.houseId);
            verifyIsAdmin(context.jwt, house, 'Only administrators can add members to a house.');

            const members = concat(house.members, args.memberId);
            return HouseModel.update(house, { members });
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
            const house = await HouseModel.get(args.houseId);
            verifyIsAdmin(context.jwt, house, 'Only administrators can delete a house.');

            return HouseModel.delete(house);
        },

        removeMemberFromHouse: async (_, args, context) => {
            const house = await HouseModel.get(args.houseId);
            verifyIsAdmin(context.jwt, house, 'Only administrators can remove members from a house.');

            const members = reject(house.members, member => member == args.memberId);
            return HouseModel.update(house, { members });
        },

        updateHouse: async (_, args, context) => {
            const house = await HouseModel.get(args.houseId);
            verifyIsAdmin(context.jwt, house, 'Only administrators can update a house.');

            return HouseModel.update(house, args);
        },
    },
};

export { typeDefs, resolvers };
