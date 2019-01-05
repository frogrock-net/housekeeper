import * as React from 'react';
import { Fragment } from 'react';
import styled from 'styled-components';
import sample from './sample1.png';
import theme from '../../util/theme';

const SampleContent = (
    <span>
        <p>This is some sample description text.</p>
        <p>Experience the beauty of Snowmass Village, Colorado with family and friends in this newly-renovated ski house.</p>
        <p>
            With five king-sized bedrooms and a cozy sleeping nook, this house can hold you and your closest two hundred and seventeen
            friends as they enjoy the slopes.
        </p>
    </span>
);

const HouseContent = ({ house }) => {
    return (
        <Fragment>
            <ViewContentContainer>
                <ViewContentImageContainer>
                    <ViewContentImage image={sample} />
                </ViewContentImageContainer>
                <ViewContentDescriptionContainer>
                    <OverviewTitle>Overview</OverviewTitle>
                    {SampleContent}
                </ViewContentDescriptionContainer>
            </ViewContentContainer>
            <OverviewContainer>
                <OverviewTitle>Inside this house</OverviewTitle>
                <OverviewSubtitle>Upper level</OverviewSubtitle>
                <OverviewSummary>
                    <li>master suite</li>
                    <li>living/entertaining area</li>
                    <li>kitchen</li>
                    <li>mudroom</li>
                    <li>outdoor patio</li>
                </OverviewSummary>
                <OverviewSubtitle>Lower level</OverviewSubtitle>
                <OverviewSummary>
                    <li>4 bedrooms with king beds</li>
                    <li>sleeping nook with queen bed</li>
                    <li>entertainment area</li>
                </OverviewSummary>
            </OverviewContainer>
            <GalleryContainer>
                <GalleryImage image={sample} />
                <GalleryImage image={sample} />
                <GalleryImage image={sample} />
                <GalleryImage image={sample} />
                <GalleryImage image={sample} />
            </GalleryContainer>
        </Fragment>
    );
};

export default HouseContent;

/**
 * A container for the ViewHouse component that takes up the rest of the screen.
 */
const ViewContentContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 510px;
    background-color: #eee;
`;

/**
 * A container for the ViewHouse component that takes up the rest of the screen.
 */
const ViewContentImageContainer = styled.div`
    padding: 30px;

    width: 50%;
    height: 100%;

    min-width: 200px;
    max-width: 850px;

    max-height: 450px;
`;

/**
 * A container for the ViewHouse component that takes up the rest of the screen.
 */
const ViewContentImage = styled.div`
    border: 15px solid rgba(0,0,0,.75);
    
    background: url('${props => props.image}');
    background-position: center;
    background-size: cover;
    background-origin: border-box;
    box-sizing: border-box;
    
    width: 100%;
    height: 100%;
    
`;

/**
 * A container for the ViewHouse component that takes up the rest of the screen.
 */
const ViewContentDescriptionContainer = styled.div`
    margin: auto 30px auto 15px;
    padding: 15px;
    min-width: 450px;
    max-width: 850px;
    width: 50%;
    font-family: ${theme.font.content};
    font-size: 18px;
    color: ${theme.color.darkerGrey};
`;

const OverviewContainer = styled.div`
    margin: 50px 0px;
    padding: 15px;
    display: flex;
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const OverviewTitle = styled.div`
    font-family: ${theme.font.header};
    font-size: 22px;
    color: ${theme.color.darkerGrey};
    margin: 0 0 45px;
`;

const OverviewSubtitle = styled.div`
    font-family: ${theme.font.header};
    font-size: 18px;
    color: ${theme.color.darkGrey};
`;

const OverviewSummary = styled.ul`
    font-family: ${theme.font.content};
    font-size: 18px;
    color: ${theme.color.darkGrey};
    list-style-type: none;
`;

/**
 * A container for the ViewHouse component that takes up the rest of the screen.
 */
const GalleryContainer = styled.div`
    padding: 15px;
    justify-content: center;
    background-color: #eee;

    display: flex;
    overflow-x: auto;
`;

/**
 * A container for the ViewHouse component that takes up the rest of the screen.
 */
const GalleryImage = styled.div`
    margin: 15px;
    border: 15px solid rgba(0,0,0,.75);
    
    background: url('${props => props.image}');
    background-position: center;
    background-size: cover;
    background-origin: border-box;
    box-sizing: border-box;
    
    height: 225px;
    width: 20%;
    min-width: 225px;
    
    cursor: pointer;
`;
