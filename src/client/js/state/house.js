// @flow
/**
 * Responsible for:
 * - creating, updating, and deleting houses
 */
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import * as React from 'react';
import { Fragment } from 'react';
import auth from './auth';

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
type Props = {
    children: CreateHouseRender,
};

/**
 * Create house mutator component.
 *
 * @param children a render function
 * @returns {*}
 * @constructor
 */
export const CreateHouse = ({ children }: Props) => {
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
        auth.token = e.data.loginUser;
    };
    return (
        <Mutation mutation={CREATE} update={update}>
            {wrapper}
        </Mutation>
    );
};
