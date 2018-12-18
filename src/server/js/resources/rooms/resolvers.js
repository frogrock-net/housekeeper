// @flow
import { GQLMutation, GQLQuery, GQLType } from '../gql';
import RoomModel from './model';

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
`((root, { houseId }, { requester }) => RoomModel.getByHouse(houseId, requester));

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
`((root, args, { requester }) => RoomModel.create(args, requester));

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
`((root, args, { requester }) => RoomModel.patch(args, requester));

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
`((root, { id }, { requester }) => RoomModel.delete(id, requester));
