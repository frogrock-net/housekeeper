// @flow
import gql from 'graphql-tag';
import styled from 'styled-components';
import * as React from 'react';
import { Query } from 'react-apollo';
import { StateContext } from '../../app';
import type { House } from '../../state/house';
import { HouseIcon } from '../Common/Icon';

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
    <OuterContainer>
        <OuterText>Manage your houses.</OuterText>
        <GetHouses>
            {(data, isLoading, error) => {
                console.log(data);
                if (data) {
                    return (
                        <InnerContainer>
                            {data.map((h, i) => (
                                <HouseCard house={h} key={i} />
                            ))}
                        </InnerContainer>
                    );
                }

                return <div>No data.</div>;
            }}
        </GetHouses>
    </OuterContainer>
);

const InnerContainer = styled.div`
    background-color: #b3d3e2;

    padding: 10px;
    display: flex;
`;

const OuterContainer = styled.div`
    background-color: #b3d3e2;
`;

const OuterText = styled.div`
    background-color: rgba(0, 0, 0, 0.35);

    font-family: 'Arvo', sans-serif;
    font-size: 20px;
    color: white;

    padding: 10px;
`;

const HouseCard = ({ house }: { house: House }) => (
    <CardContainer>
        <CardImage house={house} />
        <CardName>{house.name}</CardName>
    </CardContainer>
);

const CardContainer = styled.div`
    height: 150px;
    width: 150px;
    margin: 10px 10px;

    background-color: #999;
    border: 10px solid rgba(0, 0, 0, 0.35);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CardName = styled.div`
    padding-top: 5px;
    background-color: rgba(0, 0, 0, 0.35);
    color: white;

    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 16px;

    text-align: center;
`;

const CardImage = props => (
    <CardImageContainer>
        <Placeholder />
    </CardImageContainer>
);

const CardImageContainer = styled.div`
    background-color: white;
    height: calc(100% - 25px);
`;

const Placeholder = props => (
    <PlaceholderContainer>
        <HouseIcon size={65} color={'rgba(0,0,0,.25)'} />
    </PlaceholderContainer>
);

const PlaceholderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export default ManageMyHouses;
