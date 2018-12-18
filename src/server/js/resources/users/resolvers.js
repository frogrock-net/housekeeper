// @flow
import { GQLMutation, GQLQuery, GQLType } from '../gql';
import UserResource from './model';

// --------------------------
// typeDefs
// --------------------------
/**
 * Export the 'User' graphql type.
 */
export const User = GQLType`
    type User {
        id: ID!
        email: String
        firstName: String
        lastName: String
    }
    
    type Auth {
        user: User
        token: String
    }    
`;

// --------------------------
// Queries
// --------------------------

/**
 * Resolve the 'get user by id' query.
 *
 * @param root the root resolver
 * @param args the arguments for this query
 * @returns {Promise} a promise that resolves into the found user.
 */
export const userById = GQLQuery`
    """
    Get a user by their id address.
    Must be authenticated as the user being accessed.
    """
    userById(userId: ID!): User
`((root, { userId }, { requester }) => UserResource.get(userId, requester));

// --------------------------
// Mutations
// --------------------------
/**
 * Perform the 'create user' mutation.
 *
 * Accepted arguments:
 * - email
 * - firstName
 * - lastName
 * - password
 *
 * @param root the root resolver
 * @param args the arguments for this mutator
 * @param context the context object
 * @returns {*} a promise that resolves into the created user
 */
export const createUser = GQLMutation`
    "Create a user."
    createUser(email: String!, firstName: String, lastName: String, password: String!): User
`((root, args, { requester }) => UserResource.create(args, requester));

/**
 * Perform the 'login user' mutation.
 *
 * Accepted arguments:
 * - email
 * - password
 *
 * @param root the root resolver
 * @param args the arguments for this mutator
 * @param context the context object
 * @returns {*} a promise that resolves into the auth object
 */
export const loginUser = GQLMutation`
    "Authenticate a user."
    loginUser(email: String!, password: String!): Auth
`((root, { email, password }) => UserResource.authenticate(email, password));
