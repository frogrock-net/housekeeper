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
    
    extend type Mutation {
        createRoom(capacity: Int, description: String, house: String): String,
        updateRoom(id: String, capacity: Int, description: String, house: String): Room,
        deleteRoom(id: String): Room,
    }
`;

const resolvers = {
    Query: {
        getRooms: (root, args, context, info) => RoomModel.getAll(),
        roomsByHouse: (root, args, context, info) => RoomModel.getAllRoomsByHouse(args.houseId),
    },

    Mutation: {
        createRoom: (root, args) => RoomModel.createRoom(root, args),
        updateRoom: (root, args) => RoomModel.updateRoom(root, args),
        deleteRoom: (root, args) => RoomModel.deleteRoom(root, args),
    },
};

export { typeDefs, resolvers };
