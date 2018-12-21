// @flow
import HouseResource from './model';
import { GQLMutation, GQLQuery, GQLType } from '../gql';

// --------------------------
// typeDefs
// --------------------------
/**
 * Export the 'House' graphql type.
 */
export const House = GQLType`
    """
    It's an address.
    """
    type Address {
        "The street."
        street: String
        "The city name."
        city: String
        "The state code."
        state: String
        "The zip code."
        zip: String
    }

    """
    It's a house.
    """
    type House {
        "The unique house id."
        id: ID!
        "The house's address."
        address: Address
        "A list containing the user ids for each user allowed to administer this house."
        administrators: [String]
        "A list containing the user ids for each user allowed to view this house."
        members: [String]
        "The house's name."
        name: String
        "A description of this house."
        description: String
    }
`;

// --------------------------
// Queries
// --------------------------
/**
 * Resolve the 'get house' query.
 *
 * @param root the root resolver
 * @param args the arguments for this query
 * @returns {Promise} a promise that resolves into the found house.
 */
export const getHouse = GQLQuery`
    "Get a house by it's unique id."
    getHouse(houseId: ID!): House
`((root, { houseId }, { requester }) => HouseResource.get(houseId, requester));

/**
 * Resolve the 'get all' query.
 *
 * @returns {*} a promise that resolves into the found houses.
 */
export const allHouses = GQLQuery`
    "Get all houses visible to the requesting user."
    allHouses: [House]
`((root, args, { requester }) => HouseResource.getAll(requester));

// --------------------------
// Mutations
// --------------------------
/**
 * Perform the 'create house' mutation.
 *
 * Accepted arguments:
 *
 * - name
 * - description
 * - street
 * - city
 * - state
 * - zip
 *
 * @param root the root resolver
 * @param args the arguments for this mutator
 * @param context the context object
 * @returns {*} a promise that resolves into the created house
 */
export const createHouse = GQLMutation`
    "Create a house with the provided attributes."
    createHouse(name: String!, description: String, street: String, city: String, state: String, zip: String): House
`((root, args, { requester }) => {
    const { name, description, street, city, state, zip } = args;
    const houseData = {
        name,
        description,
        address: {
            street,
            city,
            state,
            zip,
        },
        administrators: [requester],
    };

    return HouseResource.create(houseData, requester);
});

/**
 * Perform the 'update house' mutation.
 *
 * Accepted arguments:
 * - houseId
 * - name
 * - description
 * - street
 * - city
 * - state
 * - zip
 *
 * @param root the root resolver
 * @param args the arguments for this mutator
 * @param context the context object
 * @returns {*} a promise that resolves into the updated house
 */
export const updateHouse = GQLMutation`
    """
    Update the house indicated by the provided house id. 
    Ensures that the calling user (identified by their JWT token) has permission to administer the house.
    """
    updateHouse(houseId: ID!, name: String, description: String, street: String, city: String, state: String, zip: String): House
`((root, args, { requester }) => {
    const { houseId, name, description, street, city, state, zip } = args;
    const houseData = {
        name,
        description,
        address: {
            street,
            city,
            state,
            zip,
        },
    };

    return HouseResource.patch(houseData, requester);
});

/**
 * Perform the 'add administrator to house' mutation.
 *
 * Accepted arguments:
 * - houseId
 * - administratorId
 *
 * @param root the root resolver
 * @param args the arguments for this mutator
 * @param context the context object
 * @returns {*} a promise that resolves into the updated house
 */
export const addAdministratorToHouse = GQLMutation`
    """
    Add an administrator (indicated by their user id) to a house (indicated by the house id). 
    Ensures that the calling user (identified by their JWT token) has permission to administer the house.
    """
    addAdministratorToHouse(administratorId: ID!, houseId: ID!): House
`((root, { houseId, administratorId }, { requester }) => HouseResource.addAdministrator(houseId, administratorId, requester));

/**
 * Perform the 'add member to house' mutation.
 *
 * Accepted arguments:
 * - houseId
 * - memberId
 *
 * @param root the root resolver
 * @param args the arguments for this mutator
 * @param context the context object
 * @returns {*} a promise that resolves into the updated house
 */
export const addMemberToHouse = GQLMutation`
    """
    Add a member (indicated by their user id) to a house (indicated by the house id). 
    Ensures that the calling user (identified by their JWT token) has permission to administer the house.
    """
    addMemberToHouse(memberId:ID!, houseId: ID!): House
`((root, { houseId, memberId }, { requester }) => HouseResource.addMember(houseId, memberId, requester));

/**
 * Perform the 'remove member from house' mutation.
 *
 * Accepted arguments:
 * - houseId
 * - memberId
 *
 * @param root the root resolver
 * @param args the arguments for this mutator
 * @param context the context object
 * @returns {*} a promise that resolves into the updated house
 */
export const removeMemberFromHouse = GQLMutation`
    """
    Remove a member (indicated by their user id) from a house (indicated by the house id). 
    Ensures that the calling user (identified by their JWT token) has permission to administer the house.
    """
    removeMemberFromHouse(memberId: ID!, houseId: ID!): House
`((root, { houseId, memberId }, { requester }) => HouseResource.removeMember(houseId, memberId, requester));

/**
 * Perform the 'delete house' mutation.
 *
 *
 *
 * Accepted arguments:
 * - houseId
 *
 * @param root the root resolver
 * @param args the arguments for this mutator
 * @param context the context object
 * @returns {*} a promise that resolves into the deleted house
 */
export const deleteHouse = GQLMutation`
    """
    Delete the house indicated by the provided house id. 
    Ensures that the calling user (identified by their jwt token) has permission to administer the house.
    """
    deleteHouse(houseId: ID!): House
`(async (root, { houseId }, { requester }) => HouseResource.delete(houseId, requester));
