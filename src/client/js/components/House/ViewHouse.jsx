// @flow

import * as React from 'react';
import { Fragment } from 'react';
import styled from 'styled-components';
import { GetHouse } from '../../state/house';
import Loading from '../Common/Loading';
import { BedIcon, ErrorIcon, HouseIcon } from '../Common/Icon';
import ThumbnailGallery from '../Common/ThumbnailGallery';
import { GetRoomsForHouse } from '../../state/rooms';
import BorderedContainer from '../Common/BorderedContainer';
import HouseBanner from './HouseBanner';
import HouseContent from './HouseContent';

/**
 * The props accepted by the ViewHouse component.
 * - id - string - the house id for this component to show
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
            <HouseBanner house={data} />
            <HouseContent house={data} />
            <ThumbnailGallery images={data.images} />
            <RoomList house={data} />
        </Container>
    );
};

export default ViewHouse;

/**
 * A container for the ViewHouse component that takes up the rest of the screen.
 */
const Container = styled(BorderedContainer).attrs({
    innerSpacing: 0,
})`
    min-height: calc(100% - 270px);
    display: flex;
`;

/**
 * A container for the ViewHouse error/loading components that centers the contents.
 */
const CenteredContainer = styled.div`
    height: 100%;
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

/**
 * A placeholder icon component that can be used instead of a house image.
 */
const PlaceholderRoom = () => (
    <PlaceholderContainer>
        <BedIcon size={65} color={'rgba(0,0,0,.25)'} />
    </PlaceholderContainer>
);

// -----------------------------------------------------------------------------
// RoomList
// -----------------------------------------------------------------------------

const RoomList = ({ house }) => <GetRoomsForHouse id={house.id}>{renderRoomList}</GetRoomsForHouse>;
/**
 * Render function. Render a list of rooms.
 *
 * @param data the room list
 * @param isLoading is the data loading?
 * @param error if an error occurs when fetching the data
 */
const renderRoomList = (data, isLoading, error) => {
    if (data) {
        if (data.length === 0) {
            return (
                <NoRooms>
                    <div>This house doesn't have any available rooms.</div>
                </NoRooms>
            );
        }
        return (
            <Fragment>
                {data.map((r, i) => (
                    <RoomOverview room={r} key={i} alternateColor={i % 2} />
                ))}
            </Fragment>
        );
    } else {
        return <div />;
    }
};

/**
 * A component that indicates that there aren't any rooms.
 */
const NoRooms = styled.div`
    padding: 15px;

    display: flex;
    height: 200px;

    align-items: center;
    justify-content: center;

    color: #666;
    font-size: 20px;
    font-family: 'Raleway', sans-serif;
`;

// -----------------------------------------------------------------------------
// RoomOverview
// -----------------------------------------------------------------------------

/**
 * A component that shows the overview of a room.
 *
 * @param room the room to show
 * @param alternateColor should this use the alternate color scheme?
 */
const RoomOverview = ({ room, alternateColor }) => {
    return (
        <RoomOverviewContainer alternateColor={alternateColor}>
            <RoomOverviewImage alternateColor={alternateColor} image={room.image} />
            <RoomOverlayContentContainer>
                <RoomOverlayContentName>{room.name ? room.name : 'unnamed room'}</RoomOverlayContentName>
                {room.capacity ? (
                    <RoomOverlayContentCapacity>{`${room.capacity} bed${room.capacity === 1 ? '' : 's'}`}</RoomOverlayContentCapacity>
                ) : null}
                <RoomOverlayContentDescription>{room.description}</RoomOverlayContentDescription>
            </RoomOverlayContentContainer>
        </RoomOverviewContainer>
    );
};

/**
 * A container component for the room overview.
 */
const RoomOverviewContainer = styled.div`
    padding: 10px;
    background: ${props => (props.alternateColor ? '#eee' : 'white')};
    display: flex;
`;

/**
 * Renders an image for a room, or a placeholder image.
 *
 * @param image the image, might be null
 * @param alternateColor should this use the alternate color scheme?
 */
const RoomOverviewImage = ({ image, alternateColor }) => {
    const content = image ? <RoomOverviewImageFrame image={image} /> : <PlaceholderRoom />;
    return <RoomOverviewImageContainer alternateColor={alternateColor}>{content}</RoomOverviewImageContainer>;
};

/**
 * A container component for the room overview image.
 */
const RoomOverviewImageContainer = styled.div`
    margin: 10px;
    padding: 10px;
    height: 225px;
    width: 350px;

    background: ${props => (props.alternateColor ? 'white' : '#eee')};
`;

/**
 * A component that displays the room image.
 */
const RoomOverviewImageFrame = styled.div`
    background: url('${props => props.image}');
`;

/**
 * A container component for the room overview content (name, description, etc).
 */
const RoomOverlayContentContainer = styled.div`
    margin: 10px;
    padding: 10px;
`;

/**
 * A styled div for the room overview name.
 */
const RoomOverlayContentName = styled.div`
    color: #333;
    font-size: 20px;
    font-family: 'Arvo', sans-serif;
    font-weight: bold;
`;

/**
 * A styled div for the room overview description.
 */
const RoomOverlayContentDescription = styled.div`
    margin-top: 20px;
    color: #666;
    font-size: 18px;
    font-family: 'Raleway', sans-serif;
`;

/**
 * A styled div for the room overview capacity.
 */
const RoomOverlayContentCapacity = styled.div`
    color: #666;
    font-size: 18px;
    font-family: 'Raleway', sans-serif;
`;
