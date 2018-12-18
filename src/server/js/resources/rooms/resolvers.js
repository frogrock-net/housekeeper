// @flow
import { GQLMutation, GQLQuery, GQLType } from '../gql';
import RoomResource from './model';
import HouseResource from '../houses/model';

// --------------------------
// typeDefs
// --------------------------
/**
 * Export the 'Room' graphql type.
 */
export const Room = GQLType`
    type Room {
        id: ID!
        name: String
        description: String
        capacity: Int
        house: String
    }
`;

// --------------------------
// Queries
// --------------------------

/**
 * Resolve the 'get rooms by house' query.
 *
 * @param root the root resolver
 * @param args the arguments for this query
 * @returns {Promise} a promise that resolves into the found rooms.
 */
export const roomsByHouse = GQLQuery`
    """
    Get all rooms for the provided house.
    """
    roomsByHouse(houseId: ID!): [Room]
`((root, { houseId }) => RoomResource.getByHouse(houseId));

// --------------------------
// Mutations
// --------------------------
/**
 * Perform the 'create room' mutation.
 *
 * Accepted arguments:
 * - name
 * - description
 * - capacity
 * - house
 *
 * @param root the root resolver
 * @param args the arguments for this mutator
 * @param context the context object
 * @returns {*} a promise that resolves into the created room
 */
export const createRoom = GQLMutation`
    """
    Create a room for the provided house.
    Must be authenticated as an administrator for the house to update.
    """
    createRoom(name: String!, capacity: Int, description: String, house: String!): Room
`(async (root, args, { jwt }) => {
    const house = await HouseResource.get(args.house);

    if (!house || !jwt || !isAdmin(jwt.id, house)) {
        throw new Error('Only administrators can add rooms to a house.');
    }

    return RoomResource.create(args);
});

/**
 * Perform the 'update room' mutation.
 *
 * Accepted arguments:
 * - id
 * - name
 * - description
 * - capacity
 * - house
 *
 * @param root the root resolver
 * @param args the arguments for this mutator
 * @param context the context object
 * @returns {*} a promise that resolves into the updated room
 */
export const updateRoom = GQLMutation`
    """
    Update a room for the provided house.
    Must be authenticated as an administrator for the house to update.
    """
    updateRoom(id: String!, name: String, capacity: Int, description: String): Room
`(async (root, args, { jwt }) => {
    const room = await RoomResource.get(args.id);
    const house = await HouseResource.get(room.house);

    if (!house || !jwt || !isAdmin(jwt.id, house)) {
        throw new Error('Only administrators can add rooms to a house.');
    }

    return RoomResource.patch(room, args);
});

/**
 * Perform the 'delete room' mutation.
 *
 * Accepted arguments:
 * - id
 *
 * @param root the root resolver
 * @param args the arguments for this mutator
 * @param context the context object
 * @returns {*} a promise that resolves into the deleted room
 */
export const deleteRoom = GQLMutation`
    """
    Delete a room from the provided house.
    Must be authenticated as an administrator for the house to update.
    """
    deleteRoom(id: String): Room
`(async (root, { id }, { jwt }) => {
    const room = await RoomResource.get(id);
    const house = await HouseResource.get(room.house);

    if (!house || !jwt || !isAdmin(jwt.id, house)) {
        throw new Error('Only administrators can add rooms to a house.');
    }

    return RoomResource.delete(id);
});
// --------------------------
// Helpers
// --------------------------
/**
 * Does the provided userId appear in the list of administrators for this house?
 * @param userId the user to check
 * @param house the house to check
 * @returns truthy if the userId is an admin for the house
 */
const isAdmin = (userId, house) => house.administrators.find(admin => admin == userId);
