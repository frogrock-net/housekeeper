// @flow
import React from 'react';
import styled from 'styled-components';
import { Housekeeper } from './Icon';
import theme from '../../util/theme';

/**
 * Supported props for the Logo component.
 *
 * - color - the color of the logo
 * - size - the size of the logo. represents the height of the logo component (the width will scale based on the height).
 */
type Props = {
    color: string,
    size: number,
};

/**
 * Construct a Logo component with the provided props.
 *
 * @constructor
 */
const Logo = (props: Props) => (
    <LogoContainer {...props}>
        <Housekeeper {...props} />
        <LogoText {...props}>Housekeeper</LogoText>
    </LogoContainer>
);

/**
 * The default props for the Logo component.
 */
Logo.defaultProps = {
    color: theme.color.white,
    size: 36,
};

/**
 * A styled container div for the Logo component.
 *
 * Adjusts based on the provided size prop.
 */
const LogoContainer = styled.div`
    display: flex;
    height: ${props => props.size}px;
    padding-right: ${props => props.size / 4}px;
    user-select: none;
`;

/**
 * A styled div for the 'Housekeeper' text for the Logo component.
 *
 * Adjusts based on the provided size prop.
 */
const LogoText = styled.div`
    color: ${props => props.color};
    font-family: ${theme.font.header};
    line-height: ${props => Math.round(props.size * 1.1)}px;
    font-size: ${props => Math.round(props.size * 1.1) / 2}px;
`;

export default Logo;
