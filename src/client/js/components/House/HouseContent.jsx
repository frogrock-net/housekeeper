import * as React from 'react';
import BorderedContainer from '../Common/BorderedContainer';
import styled from 'styled-components';
import sample from './sample1.png';

const HouseContent = ({ house }) => {
    return (
        <ViewContentContainer>
            <ViewContentImageContainer>
                <ViewContentImage image={sample} />
            </ViewContentImageContainer>
        </ViewContentContainer>
    );
};

export default HouseContent;

/**
 * A container for the ViewHouse component that takes up the rest of the screen.
 */
const ViewContentContainer = styled.div`
    display: flex;
    height: 450px;
`;

/**
 * A container for the ViewHouse component that takes up the rest of the screen.
 */
const ViewContentImageContainer = styled.div`
    padding: 15px;
    background-color: #eee;

    width: 100%;
    height: 100%;

    max-height: 450px;
    max-width: 600px;
`;

/**
 * A container for the ViewHouse component that takes up the rest of the screen.
 */
const ViewContentImage = styled.div`
    background: url('${props => props.image}');
    background-position: center;
    background-size: cover;

    width: 100%;
    height: 100%;
`;
