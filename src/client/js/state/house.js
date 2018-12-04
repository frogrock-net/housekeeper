// @flow
/**
 * Responsible for:
 * - creating, updating, and deleting houses
 */
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import * as React from 'react';
import { Fragment } from 'react';
import { StateContext } from '../app';

/**
 * Define the House type.
 */
export type House = {
    id: string,
    name: string,

    address: {
        street: ?string,
        city: ?string,
        state: ?string,
        zip: ?string,
    },

    icon: ?{
        image: ?string,
        color: ?string,
    },

    administrators: string[],
};

/**
 * GraphQL query mutation. Create a house.
 */
const CREATE = gql`
    mutation Create($name: String!, $street: String, $city: String, $state: String, $zip: String) {
        createHouse(name: $name, street: $street, city: $city, state: $state, zip: $zip) {
            id
            address {
                street
                city
                state
                zip
            }
            administrators
            name
        }
    }
`;

/**
 * Type signature for the create house request object.
 */
type CreateHouseRequest = {
    name: string,
    street?: string,
    city?: string,
    state?: string,
    zip?: string,
};

/**
 * The type signature for the create house request function.
 */
type CreateHouseSubmit = CreateHouseRequest => void;

/**
 * The type signature for the render prop for the CreateHouse component.
 */
type CreateHouseRender = (onSubmit: CreateHouseSubmit, isLoading: boolean, error: ?Error) => React.Node;

/**
 * Props expected by the CreateHouse component.
 *
 * Requires a render function passed as a child component.
 */
type CreateHouseProps = {
    children: CreateHouseRender,
};

/**
 * Create house mutator component.
 *
 * @param children a render function
 * @returns {*}
 * @constructor
 */
export const CreateHouse = ({ children }: CreateHouseProps) => {
    const create = (mutate, { error, loading }, render) => {
        const f = data => {
            console.log(data);
            mutate({ variables: data });
        };

        return <Fragment>{render(f, loading, error)}</Fragment>;
    };
    const wrapper = (mutate, data) => create(mutate, data, children);

    const update = (cache, e) => {
        console.log('in update');
        console.log(e);
    };

    return (
        <Mutation mutation={CREATE} update={update}>
            {wrapper}
        </Mutation>
    );
};

/**
 * List all houses for a given administratorId.
 */
const LIST_OWNED_HOUSES = gql`
    query ListOwnedHouses($administratorId: ID!) {
        housesByAdministrator(administratorId: $administratorId) {
            id
            name
        }
    }
`;

/**
 * The type signature for the render prop for the ListOwnedHouses component.
 */
type ListOwnedHousesRender = (data: House[], isLoading: boolean, error: ?Error) => React.Node;

/**
 * Props expected by the ListOwnedHouses component.
 *
 * Requires a render function passed as a child component.
 */
type ListOwnedHousesProps = {
    children: ListOwnedHousesRender,
};

/**
 * Query component that fetches a list containing each house the currently-authenticated user administers.
 */
export const ListOwnedHouses = (props: ListOwnedHousesProps) => (
    <StateContext.Consumer>
        {state => (
            <Query query={LIST_OWNED_HOUSES} variables={{ administratorId: state.auth._id }}>
                {({ loading, error, data }) => {
                    return props.children(data ? data.housesByAdministrator : [], loading, error);
                }}
            </Query>
        )}
    </StateContext.Consumer>
);

/**
 * Get a specific house by it's id.
 */
const GET_HOUSE = gql`
    query GetHouse($houseId: ID!) {
        getHouse(houseId: $houseId) {
            id
            name

            address {
                city
                state
                zip
            }
        }
    }
`;

/**
 * The type signature for the render prop for the GetHouse component.
 */
type GetHouseRender = (data: ?House, isLoading: boolean, error: ?Error) => React.Node;

/**
 * Props expected by the GetHouse component.
 *
 * Requires a render function passed as a child component.
 */
type GetHouseProps = {
    id: string,
    children: GetHouseRender,
};

/**
 * Query component that fetches an individual house.
 */
export const GetHouse = (props: GetHouseProps) => (
    <Query query={GET_HOUSE} variables={{ houseId: props.id }}>
        {({ loading, error, data }) => {
            return props.children(data ? data.getHouse : null, loading, error);
        }}
    </Query>
);
