// @flow
import styled from 'styled-components';
import * as React from 'react';
import type { House } from '../../state/house';
import { AddIcon, HouseIcon } from '../Common/Icon';
import { Link } from 'react-router-dom';
import { ROUTE_HOUSE, ROUTE_HOUSE_CREATE } from '../../util/routes';

type Props = {
    data: ?(House[]),
    isLoading: boolean,
    error: ?Error,

    selected?: ?string,

    color: string,
    selectedColor: string,
    className?: ?string,
};

const HouseHeader = (props: Props) => {
    if (props.isLoading) {
        return <div />;
    }

    if (props.error) {
        return <div>error</div>;
    }

    return (
        <Container className={props.className}>
            <DataContainer>
                {props.data
                    ? props.data.map((h, i) => (
                          <HouseCard
                              isSelected={props.selected === h.id}
                              color={props.color}
                              selectedColor={props.selectedColor}
                              house={h}
                              key={i}
                          />
                      ))
                    : null}
            </DataContainer>
            <CreateHouseCard isSelected={props.selected === 'create'} selectedColor={props.selectedColor} color={props.color} />
        </Container>
    );
};

HouseHeader.defaultProps = {
    color: '#b3d3e2',
    selectedColor: '#65727b',
};

export default HouseHeader;

const Container = styled.div`
    height: 220px;
    background: #b3d3e2;
    display: flex;
`;

const DataContainer = styled.div`
    background-color: #b3d3e2;

    display: flex;

    overflow-x: auto;
    overflow-y: hidden;
`;

type HouseCardProps = {
    house: House,
    isSelected: boolean,

    color: string,
    selectedColor: string,
};

const HouseCard = (props: HouseCardProps) => (
    <HouseCardContainer color={props.isSelected ? props.selectedColor : props.color}>
        <Link to={`${ROUTE_HOUSE}/${props.house.id}`}>
            <Card {...props} />
        </Link>
    </HouseCardContainer>
);

const HouseCardContainer = styled.div`
    background-color: ${props => props.color};

    :first-child {
        padding-left: 10px;
    }
`;

const CardBorder = styled.div`
    margin: 20px 10px;
    padding: 10px;
    height: 160px;
    width: 160px;
    background-color: ${props => props.color};
    cursor: pointer;
    flex-shrink: 0;
`;

const Card = (props: HouseCardProps) => (
    <CardBorder color={props.isSelected ? props.selectedColor : '#666'}>
        <CardContainer>
            <CardImage house={props.house} />
            <CardName>{props.house.name}</CardName>
        </CardContainer>
    </CardBorder>
);

const CardImage = ({ house }) => {
    const color = house.icon ? house.icon.color || 'white' : 'white';
    const image = house.icon && house.icon.image ? <Image image={house.icon.image} /> : <Placeholder color={color} />;
    return <CardImageContainer color={color}>{image}</CardImageContainer>;
};

const Image = styled.div`
    height: 65px;
    width: 65px;
    background: url(${props => props.image});
`;

const CardContainer = styled.div`
    margin: auto;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CardImageContainer = styled.div`
    background-color: ${props => props.color};
    height: calc(100% - 25px);
`;

const Placeholder = () => (
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

const CardName = styled.div`
    padding-top: 6px;
    color: white;

    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 16px;

    text-align: center;
`;

const CreateHouseCard = ({ isSelected, color, selectedColor }) => (
    <HouseCardContainer color={isSelected ? selectedColor : color}>
        <Link to={`${ROUTE_HOUSE_CREATE}`}>
            <CardBorder color={isSelected ? selectedColor : '#666'}>
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
    </HouseCardContainer>
);
