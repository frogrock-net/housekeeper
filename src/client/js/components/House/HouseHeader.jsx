// @flow
import styled from 'styled-components';
import * as React from 'react';
import type { House } from '../../state/house';
import { AddIcon, ErrorIcon, HouseIcon } from '../Common/Icon';
import { Link } from 'react-router-dom';
import { ROUTE_HOUSE, ROUTE_HOUSE_CREATE } from '../../util/routes';
import Loading from '../Common/Loading';

/**
 * Type defining the props accepted by the HouseHeader component.
 *
 * - data - list of houses - (optional) the data to display
 * - isLoading - boolean - is the data currently being fetched?
 * - error - Error - (optional) was there an error while fetching data?
 * - selected - string - (optional) the id of the currently selected house
 * - color - string - (optional) the background color
 * - selectedColor - string - (optional) the background color when a house is selected
 * - className - string - (optional) a className to apply to the root element
 */
type Props = {
    data: ?(House[]),
    isLoading: boolean,
    error: ?Error,

    selected?: ?string,

    color: string,
    selectedColor: string,
    className?: ?string,
};

/**
 * The HouseHeader component.
 *
 * Displays a card for each house in the provided data list, which links to the
 * corresponding view house page. At the end of the list, displays a card that
 * links to the create house page.
 *
 * @param props the props for this component, as described above.
 */
const HouseHeader = (props: Props) => {
    if (props.isLoading) {
        return (
            <Container color={props.color} className={props.className}>
                <LoadingHouseCard color={props.color} />
            </Container>
        );
    }

    if (props.error) {
        return (
            <Container color={'#ad6f6f'} className={props.className}>
                <ErrorHouseCard />
            </Container>
        );
    }

    return (
        <Container color={props.color} className={props.className}>
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
            <CreateHouseCard isSelected={props.selected === 'create'} selectedColor={props.selectedColor} color={props.color} />
        </Container>
    );
};

/**
 * The default props for the HouseHeader component.
 *
 * color - a light blue
 * selectedColor - a darker blue
 */
HouseHeader.defaultProps = {
    color: '#b3d3e2',
    selectedColor: '#65727b',
};

export default HouseHeader;

/**
 * A styled container div for the HouseHeader component.
 */
const Container = styled.div`
    height: 220px;
    background: ${props => props.color};
    display: flex;

    display: flex;
    justify-content: center;

    overflow-x: auto;
    overflow-y: hidden;
`;

// -----------------------------------------------------------------------------
// HouseCard
// -----------------------------------------------------------------------------

/**
 * The props accepted for the HouseCard component.
 *
 * - house - House - a house
 * - isSelected - boolean - is this card selected?
 * - color - string - the normal color for this card
 * - selectedColor - string - the color for this card when it's selected
 */
type HouseCardProps = {
    house: House,
    isSelected: boolean,

    color: string,
    selectedColor: string,
};

/**
 * A HouseCard component.
 *
 * Displays an icon with a picture of the house, or a placeholder icon, and shows
 * the name of the house. Links to the view house page for the house represented
 * by this card.
 *
 * @param props the props, described above.
 */
const HouseCard = (props: HouseCardProps) => (
    <HouseCardContainer color={props.isSelected ? props.selectedColor : props.color}>
        <Link to={`${ROUTE_HOUSE}/${props.house.id}`}>
            <CardBorder color={props.isSelected ? props.selectedColor : '#666'}>
                <CardContainer>
                    <CardImage house={props.house} />
                    <CardName>{props.house.name}</CardName>
                </CardContainer>
            </CardBorder>
        </Link>
    </HouseCardContainer>
);

/**
 * A styled container div for the HouseCard component.
 */
const HouseCardContainer = styled.div`
    background-color: ${props => props.color};
`;

/**
 * A styled div for the HouseCard component.
 *
 * Sets the size of the card and provides a 10px border around the card.
 */
const CardBorder = styled.div`
    margin: 20px 10px;
    padding: 10px;
    height: 160px;
    width: 160px;
    background-color: ${props => props.color};
    cursor: pointer;
    flex-shrink: 0;
`;

/**
 * A styled div for the HouseCard component.
 *
 * Holds the image and name elements and positions them vertically.
 */
const CardContainer = styled.div`
    margin: auto;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

/**
 * A styled div that formats the text used in the HouseCard component.
 */
const CardName = styled.div`
    padding-top: 6px;
    color: white;

    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 16px;

    text-align: center;
`;

// -----------------------------------------------------------------------------
// CardImage
// -----------------------------------------------------------------------------

/**
 * A CardImage component.
 *
 * If the house object contains an icon, use that as the image. Otherwise, display a placeholder icon.
 *
 * @param house the house
 */
const CardImage = ({ house }) => {
    const color = house && house.icon ? house.icon.color || 'white' : 'white';
    const image = house && house.icon && house.icon.image ? <Image image={house.icon.image} /> : <Placeholder color={color} />;
    return <CardImageContainer color={color}>{image}</CardImageContainer>;
};

/**
 * A styled div that contains a background image.
 */
const Image = styled.div`
    height: 65px;
    width: 65px;
    background: url(${props => props.image});
`;

/**
 * A styled container div for the CardImage component.
 */
const CardImageContainer = styled.div`
    background-color: ${props => props.color};
    height: calc(100% - 25px);
`;

// -----------------------------------------------------------------------------
// Placeholder
// -----------------------------------------------------------------------------

/**
 * A placeholder icon component that can be used instead of a house image.
 */
const Placeholder = () => (
    <PlaceholderContainer>
        <HouseIcon size={65} color={'rgba(0,0,0,.25)'} />
    </PlaceholderContainer>
);

/**
 * A styled container div for the Placeholder component.
 */
const PlaceholderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

// -----------------------------------------------------------------------------
// CreateHouseCard
// -----------------------------------------------------------------------------

/**
 * A 'CreateHouseCard' that links to the create house page.
 *
 * @param isSelected is this selected?
 * @param color the background color when not selected
 * @param selectedColor the background color when selected
 */
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

// -----------------------------------------------------------------------------
// LoadingHouseCard
// -----------------------------------------------------------------------------

/**
 * A LoadingHouseCard that displays a loading animation inside of a card.
 */
const LoadingHouseCard = () => (
    <HouseCardContainer>
        <CardBorder color={'#666'}>
            <CardContainer>
                <PlaceholderContainer>
                    <Loading />
                </PlaceholderContainer>
            </CardContainer>
        </CardBorder>
    </HouseCardContainer>
);

// -----------------------------------------------------------------------------
// ErrorHouseCard
// -----------------------------------------------------------------------------

/**
 * An ErrorHouseCard that displays an error graphic inside of a card.
 */
const ErrorHouseCard = () => (
    <HouseCardContainer>
        <CardBorder>
            <CardContainer>
                <CardImageContainer>
                    <PlaceholderContainer>
                        <ErrorIcon size={65} color={'white'} />
                    </PlaceholderContainer>
                </CardImageContainer>
                <CardName>An error occurred.</CardName>
            </CardContainer>
        </CardBorder>
    </HouseCardContainer>
);
