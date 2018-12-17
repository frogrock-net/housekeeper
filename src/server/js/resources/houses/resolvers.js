import HouseResource from './database';
import { GQLMutation, GQLQuery, GQLType } from '../graphql_helpers';
import UserModel from '../users/model';

// --------------------------
// typeDefs
// --------------------------
/**
 * Export the 'House' graphql type.
 */
export const House = GQLType`
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
    getHouse(houseId: ID!): House
`({
    getHouse: (root, { houseId }) => HouseResource.get(houseId),
});

/**
 * Resolve the 'get all' query.
 *
 * @returns {*} a promise that resolves into the found houses.
 */
export const allHouses = GQLQuery`
    allHouses: [House]
`({
    allHouses: () => HouseResource.getAll(),
});

/**
 * Resolve the 'get houses by administrator id' query.
 *
 * @param root the root resolver
 * @param args the arguments for this query
 * @returns {*} a promise that resolves into the found houses.
 */
export const housesByAdministrator = GQLQuery`
    housesByAdministrator(administratorId: ID!): [House]
`({
    housesByAdministrator: (root, { administratorId }) => HouseResource.getByAdministrator(administratorId),
});

/**
 * Resolve the 'get houses by member id' query.
 *
 * @param root the root resolver
 * @param args the arguments for this query
 * @returns {*} a promise that resolves into the found houses.
 */
export const housesByMember = GQLQuery`
    housesByMember(memberId: ID!): [House]
`({
    housesByMember: (root, { memberId }) => HouseResource.getByMember(memberId),
});

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
`({
    createHouse: async (root, args, { jwt }) => {
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
        };

        return HouseResource.create(houseData, jwt.id);
    },
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
`({
    updateHouse: async (root, args, { jwt }) => {
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

        const house = await HouseResource.get(houseId);
        verifyIsAdmin(jwt, house, 'Only administrators can update a house.');

        return HouseResource.patch(house, houseData);
    },
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
`({
    addAdministratorToHouse: async (root, { houseId, administratorId }, { jwt }) => {
        const house = await HouseResource.get(houseId);
        verifyIsAdmin(jwt, house, 'Only administrators can add administrators to a house!');

        const admin = await UserModel.get(administratorId);
        if (!admin) {
            throw new Error('Cannot find the user!');
        }

        if (!house.administrators.find(admin => admin == administratorId)) {
            const administrators = house.administrators.concat(administratorId);
            return HouseResource.patch(house, { administrators });
        }

        return house;
    },
});

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
`(async (root, { houseId, memberId }, { jwt }) => {
    const house = await HouseResource.get(houseId);
    verifyIsAdmin(jwt, house, 'Only administrators can add members to a house.');

    const admin = await UserModel.get(memberId);
    if (!admin) {
        throw new Error('Cannot find the user!');
    }

    if (!house.members.find(member => member == memberId)) {
        const members = house.members.concat(memberId);
        return HouseResource.patch(house, { members });
    }

    return house;
});

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
`(async (root, { houseId, memberId }, { jwt }) => {
    const house = await HouseResource.get(houseId);
    verifyIsAdmin(jwt, house, 'Only administrators can remove members from a house.');

    const members = house.members.filter(member => member != memberId);

    return HouseResource.patch(house, { members });
});

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
`({
    deleteHouse: async (root, { houseId }, { jwt }) => {
        const house = await HouseResource.get(houseId);
        verifyIsAdmin(jwt, house, 'Only administrators can delete a house.');

        return HouseResource.delete(house);
    },
});

// --------------------------
// Helpers
// --------------------------
/**
 * Verify that the currently authenticated user can administer the provided house.
 *
 * @param jwt the user's token
 * @param house the house to check
 * @param errMsg the error message to respond with, if unsuccessful
 */
const verifyIsAdmin = (jwt, house, errMsg) => {
    if (!jwt || house.administrators.filter(admin => admin == jwt.id).size() === 0) {
        throw new Error(errMsg);
    }
};