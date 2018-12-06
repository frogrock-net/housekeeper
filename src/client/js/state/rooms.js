// @flow
/**
 * Responsible for:
 * - fetching, creating, updating, and deleting rooms
 */
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import * as React from 'react';
import { Fragment } from 'react';
import { StateContext } from '../app';

/**
 * Define the Room type.
 */
export type Room = {
    id: string,
    name: string,
    description: ?string,
};

/**
 * Get all rooms for an individual house.
 */
const GET_ROOMS_FOR_HOUSE = gql`
    query GetRooms($houseId: ID!) {
        roomsByHouse(houseId: $houseId) {
            id
            description
        }
    }
`;

/**
 * The type signature for the render prop for the GetRoomsForHouse component.
 */
type GetRoomsForHouseRender = (data: ?(Room[]), isLoading: boolean, error: ?Error) => React.Node;

/**
 * Props expected by the GetRoomsForHouse component.
 *
 * Requires a render function passed as a child component.
 */
type GetRoomsForHouseProps = {
    id: string,
    children: GetRoomsForHouseRender,
};

/**
 * Query component that fetches the list of rooms for an individual house.
 */
export const GetRoomsForHouse = (props: GetRoomsForHouseProps) => (
    <Query query={GET_ROOMS_FOR_HOUSE} variables={{ houseId: props.id }}>
        {({ loading, error, data }) => {
            return props.children(data ? data.roomsByHouse : [], loading, error);
        }}
    </Query>
);
