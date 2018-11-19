import RoomModel from './model';

const typeDefs = `
    type Room {
        id: ID!
        capacity: Int
        description: String
        house: House
    }

    extend type Query {
        roomsByHouse(houseId: ID!): [Room],
    }
`;

const resolvers = {
    Query: {
        roomsByHouse: (root, args, context, info) =>
            RoomModel.find({ house: args.houseId }).populate({
                path: 'house',
                populate: {
                    path: 'administrators',
                },
            }),
    },
};

export { typeDefs, resolvers };
