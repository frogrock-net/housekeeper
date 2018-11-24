import RoomModel from './model';

const typeDefs = `
    type Room {
        id: ID!
        capacity: Int
        description: String
        house: String
    }

    extend type Query {
        getRooms: [Room],
        roomsByHouse(houseId: ID!): [Room],
    }
`;

const resolvers = {
    Query: {
        getRooms: (root, args, context, info) => RoomModel.getAll(),
        roomsByHouse: (root, args, context, info) =>
            RoomModel.getAllRoomsByHouse(args.houseId),
    },
};

export { typeDefs, resolvers };
