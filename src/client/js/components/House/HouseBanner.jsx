import * as React from 'react';
import styled from 'styled-components';
import { HouseIcon } from '../Common/Icon';
import FormInput from '../Common/Form/FormInput';
import { FormDiv } from '../Common/Form/Form';
import sample from './sample_banner.png';
/**
 * A component that displays house information as a banner.
 *
 * @param house the house
 * @param isEditable should the user be able to edit the information?
 */
const HouseBanner = ({ house }) => {
    const color = house && house.banner ? house.banner.color || 'white' : 'white';
    // const image = house && house.banner && house.banner.image ? <BannerImage image={house.banner.image} /> : <PlaceholderHouse color={color} />;
    const image = (
        <BannerImage image={sample}>
            <BannerName>{house.name}</BannerName>
            <BannerAddress address={house.address} />
        </BannerImage>
    );

    return (
        <BannerContainer color={color}>
            <BannerImageContainer>{image}</BannerImageContainer>
        </BannerContainer>
    );
};

export default HouseBanner;

export const EditableHouseBanner = house => {
    const color = house && house.banner ? house.banner.color || 'white' : 'white';
    const image =
        house && house.banner && house.banner.image ? <BannerImage image={house.banner.image} /> : <PlaceholderHouse color={color} />;

    return (
        <EditableBannerContainer>
            <BannerImageContainer color={color}>{image}</BannerImageContainer>
            <EditableBannerName fieldName={'name'} placeholder={'Unnamed house'} />
            <EditableLocationContainer>
                <EditableBannerCity fieldName={'city'} placeholder={'City'} />
                <EditableBannerState fieldName={'state'} placeholder={'State'} />
            </EditableLocationContainer>
        </EditableBannerContainer>
    );
};

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
    color: #ccc;

    font-family: 'Arvo', sans-serif;
    font-weight: bold;
    font-size: 20px;

    text-align: center;
    background-color: rgba(0, 0, 0, 0.75);
`;

/**
 * A styled container div for the Banner component.
 */
const EditableBannerContainer = styled(FormDiv)`
    background-color: #eee;
    width: 100%;
`;

/**
 * A styled container div for the Banner component.
 */
const EditableLocationContainer = styled(FormDiv)`
    max-width: 500px;
    margin: auto;
    display: flex;
    justify-content: center;
`;

/**
 * A styled div that formats the text used in the Banner component.
 */
const EditableBannerName = styled(FormInput)`
    padding: 10px;
    width: initial;
    max-width: 350px;
    margin: auto;
    height: 25px;

    input {
        margin: 0;
        color: #333 !important;
        font-family: 'Arvo', sans-serif;
        font-weight: bold;
        font-size: 20px;
        text-align: center;
        height: initial;
    }

    background-color: #eee;
`;

/**
 * A styled div that formats the text used in the Banner component.
 */
const EditableBannerCity = styled(FormInput)`
    padding: 10px;
    width: initial;
    max-width: 300px;
    margin: 0;
    padding: 0 0 10px 0;
    height: 20px;

    input {
        color: #666 !important;
        font-family: 'Raleway', sans-serif;
        font-weight: bold;
        font-size: 17px;
        text-align: center;
        height: initial;
    }

    text-align: center;
    background-color: #eee;
`;

/**
 * A styled div that formats the text used in the Banner component.
 */
const EditableBannerState = styled(FormInput)`
    padding: 10px;
    width: initial;
    max-width: 100px;
    margin: 0;
    padding: 0 0 10px 0;
    height: 20px;

    input {
        color: #666 !important;
        font-family: 'Raleway', sans-serif;
        font-weight: bold;
        font-size: 17px;
        text-align: center;
        height: initial;
    }

    text-align: center;
    background-color: #eee;
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
const PlaceholderHouse = () => (
    <PlaceholderContainer>
        <HouseIcon size={65} color={'rgba(0,0,0,.25)'} />
    </PlaceholderContainer>
);

/**
 * A styled container div for the PlaceholderHouse component.
 */
const PlaceholderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;
