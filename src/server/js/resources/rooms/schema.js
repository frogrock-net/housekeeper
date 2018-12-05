import RoomModel from './model';
import HouseModel from '../houses/model';
import { find } from 'lodash';

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
        createRoom(capacity: Int, description: String, house: String): Room,
        updateRoom(id: String, capacity: Int, description: String): Room,
        deleteRoom(id: String): Room,
    }
`;

const isAdmin = (userId, house) => find(house.administrators, admin => admin == userId);

const resolvers = {
    Query: {
        getRooms: () => RoomModel.getAll(),
        roomsByHouse: (root, args) => RoomModel.getAllRoomsByHouse(args),
    },

    Mutation: {
        createRoom: async (root, args, context) => {
            await HouseModel.get(args.house).then(house => {
                if (!isAdmin(context.jwt.id, house)) {
                    throw new Error('Only administrators can add rooms to a house.');
                }
            });
            return RoomModel.create(args);
        },

        updateRoom: async (root, args, context) => {
            await RoomModel.get(args.id).then(async room => {
                await HouseModel.get(room.house).then(house => {
                    if (!isAdmin(context.jwt.id, house)) {
                        throw new Error('Only administrators can update rooms.');
                    }
                });
            });
            return RoomModel.update(args);
        },

        deleteRoom: async (root, args, context) => {
            await RoomModel.get(args.id).then(async room => {
                await HouseModel.get(room.house).then(house => {
                    if (!isAdmin(context.jwt.id, house)) {
                        throw new Error('Only administrators can delete rooms.');
                    }
                });
            });
            return RoomModel.delete(args);
        },
    },
};

export { typeDefs, resolvers };
