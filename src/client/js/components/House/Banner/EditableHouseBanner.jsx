// -
// Editable
// -

import sample from '../sample_banner.png';
import styled from 'styled-components';
import { FormDiv } from '../../Common/Form/Form';
import FormInput from '../../Common/Form/FormInput';
import * as React from 'react';
import { HouseIcon } from '../../Common/Icon';
import theme from '../../../util/theme';

export const EditableHouseBanner = house => {
    const color = house && house.banner ? house.banner.color || 'white' : 'white';
    let image;

    if (house && house.banner) {
        image = (
            <EditableBannerImage image={sample}>
                <EditableBannerName fieldName={'name'} placeholder={'Unnamed house'} />
                <EditableLocationContainer>
                    <EditableBannerCity fieldName={'city'} placeholder={'City'} />
                    <EditableBannerState fieldName={'state'} placeholder={'State'} />
                </EditableLocationContainer>
            </EditableBannerImage>
        );
    } else {
        image = (
            <EditablePlaceholderContainer>
                <PlaceholderIconContainer>
                    <HouseIcon size={65} color={'rgba(0,0,0,.25)'} />
                </PlaceholderIconContainer>
                <EditableFormContainer>
                    <EditableBannerName fieldName={'name'} placeholder={'Unnamed house'} />
                    <EditableLocationContainer>
                        <EditableBannerCity fieldName={'city'} placeholder={'City'} />
                        <EditableBannerState fieldName={'state'} placeholder={'State'} />
                    </EditableLocationContainer>
                </EditableFormContainer>
            </EditablePlaceholderContainer>
        );
    }

    return (
        <EditableBannerContainer>
            <EditableBannerImageContainer color={color}>{image}</EditableBannerImageContainer>
        </EditableBannerContainer>
    );
};

/**
 * A styled container div for the Banner component.
 */
const EditableBannerContainer = styled(FormDiv)`
    width: 100%;
`;

/**
 * A styled container div for the Banner component.
 */
const EditableFormContainer = styled(FormDiv)`
    background-color: rgba(0, 0, 0, 0.75);
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
        color: ${theme.color.lightGrey} !important;
        font-family: 'Arvo', sans-serif;
        font-weight: bold;
        font-size: 20px;
        text-align: center;
        height: initial;
    }

    input::placeholder {
        color: #aaa;
    }
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
        color: #aaa !important;
        font-family: 'Raleway', sans-serif;
        font-weight: bold;
        font-size: 17px;
        text-align: center;
        height: initial;
    }

    input::placeholder {
        color: ${theme.color.mediumGrey};
    }

    text-align: center;
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
        color: #aaa !important;
        font-family: 'Raleway', sans-serif;
        font-weight: bold;
        font-size: 17px;
        text-align: center;
        height: initial;
    }

    input::placeholder {
        color: ${theme.color.mediumGrey};
    }

    text-align: center;
`;

/**
 * A styled div that contains a background image.
 */
const EditableBannerImage = styled(FormDiv)`
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
const EditableBannerImageContainer = styled(FormDiv)`
    height: 275px;
`;

/**
 * A styled container div for the PlaceholderHouse component.
 */
const EditablePlaceholderContainer = styled(FormDiv)`
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
