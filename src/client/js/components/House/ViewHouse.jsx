// @flow

import * as React from 'react';
import { Fragment } from 'react';
import styled from 'styled-components';
import { GetHouse } from '../../state/house';
import Loading from '../Common/Loading';
import { ErrorIcon, HouseIcon } from '../Common/Icon';

/**
 * The props accepted by the ViewHouse component.
 */
type Props = {
    id: string,
};

/**
 * I'm not really sure what's going on here yet.
 */
const ViewHouse = (props: Props) => <GetHouse id={props.id}>{renderViewHouse}</GetHouse>;

/**
 * Render function.
 *
 * @param data a house
 * @param isLoading
 * @param error
 * @returns {*}
 */
const renderViewHouse = (data, isLoading, error) => {
    // render a loading component if the data is loading!
    if (isLoading) {
        return (
            <Container>
                <CenteredContainer>
                    <Loading />
                </CenteredContainer>
            </Container>
        );
    }

    // render an error component if we encountered an error!
    // this is still a WIP...
    if (error || !data) {
        return (
            <Container>
                <CenteredContainer>
                    <ErrorIcon size={65} color={'#ad6f6f'} />
                </CenteredContainer>
            </Container>
        );
    }

    return (
        <Container>
            <InnerContainer>
                <Banner house={data} />
            </InnerContainer>
        </Container>
    );
};

export default ViewHouse;

/**
 * A container for the ViewHouse component that takes up the rest of the screen.
 */
const Container = styled.div`
    background: #65727b;
    display: flex;
    padding: 15px;

    min-height: calc(100% - 350px);
`;

/**
 * A 50px header.
 */
const InnerContainer = styled.div`
    background: white;
    padding: 10px;
    width: 100%;
    margin: 0px auto;
`;

const Banner = ({ house }) => {
    const color = house && house.icon ? house.icon.color || 'white' : 'white';
    const image = house && house.icon && house.icon.image ? <BannerImage image={house.icon.image} /> : <Placeholder color={color} />;
    return (
        <BannerContainer>
            <BannerImageContainer color={color}>{image}</BannerImageContainer>
            <BannerName>{house.name}</BannerName>
        </BannerContainer>
    );
};

/**
 * A styled container div for the Banner component.
 */
const BannerContainer = styled.div``;

/**
 * A styled div that formats the text used in the Banner component.
 */
const BannerName = styled.div`
    padding: 10px;
    color: #333;

    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 20px;

    text-align: center;
    background-color: #eee;
`;

/**
 * A styled div that contains a background image.
 */
const BannerImage = styled.div`
    height: 100%;
    width: 100%;
    background: url(${props => props.image});
`;

/**
 * A styled container div for the Banner component.
 */
const BannerImageContainer = styled.div`
    height: 150px;
    background-color: ${props => props.color};
`;

/**
 * A container for the ViewHouse error/loading components that extends InnerContainer and centers the contents.
 */
const CenteredContainer = styled(InnerContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
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
