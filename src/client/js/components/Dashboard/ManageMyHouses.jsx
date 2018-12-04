// @flow
import styled from 'styled-components';
import * as React from 'react';
import type { House } from '../../state/house';
import { ListOwnedHouses } from '../../state/house';
import { AddIcon, HouseIcon } from '../Common/Icon';
import { Link } from 'react-router-dom';
import type { RouterProps } from '../../util/types';
import { ROUTE_HOUSE, ROUTE_HOUSE_CREATE } from '../../util/routes';

const ManageMyHouses = (props: RouterProps) => (
    <OuterContainer>
        <ListOwnedHouses>
            {(data, isLoading, error) => {
                console.log(data);
                if (data) {
                    return <HouseContainer data={data} />;
                }

                return <div>No data.</div>;
            }}
        </ListOwnedHouses>
    </OuterContainer>
);

const HouseContainer = props => (
    <InnerContainer>
        {props.data.map((h, i) => (
            <HouseCard house={h} key={i} />
        ))}
        <CreateHouseCard />
    </InnerContainer>
);

const InnerContainer = styled.div`
    background-color: #b3d3e2;

    padding: 10px;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
`;

const OuterContainer = styled.div`
    background-color: #b3d3e2;
    height: 220px;
`;

const OuterText = styled.div`
    background-color: rgba(0, 0, 0, 0.35);

    font-family: 'Arvo', sans-serif;
    font-size: 20px;
    color: white;

    padding: 10px;
`;

const HouseCard = ({ house }: { house: House }) => (
    <Link to={`${ROUTE_HOUSE}/${house.id}`}>
        <CardBorder color={'#666'}>
            <CardContainer>
                <CardImage house={house} />
                <CardName>{house.name}</CardName>
            </CardContainer>
        </CardBorder>
    </Link>
);

const CardBorder = styled.div`
    margin: 10px 10px;
    padding: 10px;
    height: 160px;
    width: 160px;
    background-color: ${props => props.color};
    cursor: pointer;
    flex-shrink: 0;
`;

const CardContainer = styled.div`
    margin: auto;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CardName = styled.div`
    padding-top: 6px;
    color: white;

    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 16px;

    text-align: center;
`;

const CardImage = props => (
    <CardImageContainer color={'white'}>
        <Placeholder />
    </CardImageContainer>
);

const CardImageContainer = styled.div`
    background-color: ${props => props.color};
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

const CreateHouseCard = () => (
    <Link to={`${ROUTE_HOUSE_CREATE}`}>
        <CardBorder color={'#666'}>
            <CardContainer>
                <CardImageContainer>
                    <PlaceholderContainer>
                        <AddIcon size={65} color={'#eee'} />
                    </PlaceholderContainer>
                </CardImageContainer>
                <CardName>Add a house</CardName>
            </CardContainer>
        </CardBorder>
    </Link>
);

export default ManageMyHouses;
