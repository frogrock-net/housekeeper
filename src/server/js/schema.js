import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import HouseModel from './resources/houses/model';
import * as houseSchema from './resources/houses/schema';
import RoomModel from './resources/rooms/model';
import * as roomSchema from './resources/rooms/schema';
import UserModel from './resources/users/model';
import * as userSchema from './resources/users/schema';

const queryTypeDefs = `
    type Query {
        allHouses: [House],
        housesByAdministrator(administratorId: ID!): [House],
        roomsByHouse(houseId: ID!): [Room],
        allUsers: [User],
        userByEmail(email: String): User,
    }
`;

const queryResolvers = {
    Query: {
        allHouses: (root, args, context, info) =>
            HouseModel.find().populate('administrators'),
        housesByAdministrator: (root, args, context, info) =>
            HouseModel.find({ administrators: args.administratorId }).populate(
                'administrators'
            ),
        roomsByHouse: (root, args, context, info) =>
            RoomModel.find({ house: args.houseId }).populate({
                path: 'house',
                populate: {
                    path: 'administrators',
                },
            }),
        allUsers: (root, args, context, info) => UserModel.find(),
        userByEmail: (root, args, context, info) =>
            UserModel.findOne({ email: args.email }),
    },
};

const schema = makeExecutableSchema({
    typeDefs: [
        queryTypeDefs,
        houseSchema.typeDefs,
        roomSchema.typeDefs,
        userSchema.typeDefs,
    ],
    resolvers: merge(
        queryResolvers,
        houseSchema.resolvers,
        roomSchema.resolvers,
        userSchema.resolvers
    ),
});

export default schema;
