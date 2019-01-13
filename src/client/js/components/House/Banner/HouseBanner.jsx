import * as React from 'react';
import styled from 'styled-components';
import { HouseIcon } from '../../Common/Icon';
import FormInput from '../../Common/Form/FormInput';
import { FormDiv } from '../../Common/Form/Form';
import sample from '../sample_banner.png';
import theme from '../../../util/theme';

/**
 * A component that displays house information as a banner.
 *
 * @param house the house
 * @param isEditable should the user be able to edit the information?
 */
const HouseBanner = ({ house }) => {
    const color = house && house.banner ? house.banner.color || 'white' : 'white';
    let image;

    if (house && house.banner) {
        image = (
            <BannerImage image={sample}>
                <BannerName>{house.name}</BannerName>
                <BannerAddress address={house.address} />
            </BannerImage>
        );
    } else {
        image = (
            <PlaceholderHouse>
                <BannerName>{house.name}</BannerName>
                <BannerAddress address={house.address} />
            </PlaceholderHouse>
        );
    }

    return (
        <BannerContainer color={color}>
            <BannerImageContainer>{image}</BannerImageContainer>
        </BannerContainer>
    );
};

export default HouseBanner;

/**
 * Component that displays the location for the house.
 *
 * @param address the house's address object
 */
const BannerAddress = ({ address }) => {
    if (!address || (!address.city && !address.state)) return null;
    const text = address.city && address.state ? `${address.city}, ${address.state}` : address.city ? address.city : address.state;
    return <BannerLocation>{text}</BannerLocation>;
};

/**
 * A styled container div for the Banner component.
 */
const BannerContainer = styled.div`
    background-color: ${props => props.color};
`;

/**
 * A styled div that formats the text used in the Banner component.
 */
const BannerName = styled.div`
    padding: 10px;
    color: ${theme.color.lightGrey};

    font-family: 'Arvo', sans-serif;
    font-weight: bold;
    font-size: 20px;

    text-align: center;
    background-color: rgba(0, 0, 0, 0.75);
`;

const BannerLocation = styled.div`
    padding-bottom: 10px;
    color: #aaa;

    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 17px;

    text-align: center;
    background-color: rgba(0, 0, 0, 0.75);
`;

/**
 * A styled div that contains a background image.
 */
const BannerImage = styled.div`
    height: 100%;
    width: 100%;
    background: url(${props => props.image});
    background-position: center;
    background-size: cover;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

/**
 * A styled container div for the Banner component.
 */
const BannerImageContainer = styled.div`
    height: 275px;
`;

// -----------------------------------------------------------------------------
// Placeholder
// -----------------------------------------------------------------------------

/**
 * A placeholder icon component that can be used instead of a house image.
 */
const PlaceholderHouse = ({ children }) => (
    <PlaceholderContainer>
        <PlaceholderIconContainer>
            <HouseIcon size={65} color={'rgba(0,0,0,.25)'} />
        </PlaceholderIconContainer>
        {children}
    </PlaceholderContainer>
);

/**
 * A styled container div for the PlaceholderHouse component.
 */
const PlaceholderContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

/**
 * A styled container div for the PlaceholderHouse component.
 */
const PlaceholderIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;
