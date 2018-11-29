// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { StateContext } from '../../app';
import type { House } from '../../state/house';

/**
 * Get all houses for a given administratorId.
 */
const GET_HOUSES = gql`
    query GetHouses($administratorId: ID!) {
        housesByAdministrator(administratorId: $administratorId) {
            id
            name
        }
    }
`;

/**
 * The type signature for the render prop for the GetHouses component.
 */
type GetHousesRender = (data: House[], isLoading: boolean, error: ?Error) => React.Node;

/**
 * Props expected by the GetHouses component.
 *
 * Requires a render function passed as a child component.
 */
type Props = {
    children: GetHousesRender,
};

/**
 * I'm not really sure what's going on here yet.
 */
const GetHouses = (props: Props) => (
    <StateContext.Consumer>
        {state => (
            <Query query={GET_HOUSES} variables={{ administratorId: state.auth._id }}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return `Error!: ${error}`;
                    return props.children(data ? data.housesByAdministrator : [], loading, error);
                }}
            </Query>
        )}
    </StateContext.Consumer>
);

const ManageMyHouses = () => (
    <GetHouses>
        {(data, isLoading, error) => {
            console.log(data);
            if (data) {
                return (
                    <div>
                        {data.map((h, i) => (
                            <HouseCard house={h} key={i} />
                        ))}
                    </div>
                );
            }

            return <div>No data.</div>;
        }}
    </GetHouses>
);

const HouseCard = ({ house }: { house: House }) => <div>{house.name}</div>;

export default ManageMyHouses;
