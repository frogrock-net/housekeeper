// @flow
import * as React from 'react';
import styled from 'styled-components';
import theme from '../../util/theme';

/**
 * Supported props for this bordered container component.
 *
 * - children - the react children
 * - borderColor - the border color
 * - innerColor - the content color
 * - spacing - the amount of space for the border
 * - innerSpacing - the amount of padding
 * - className - a classname for this component
 */
type Props = {
    children?: React.Node,

    borderColor: string,
    innerColor: string,
    spacing: number,
    innerSpacing: number,

    className?: string,
};

/**
 * A common BorderedContainter component.
 *
 * It's a container component with a 'border' around it.
 */
const BorderedContainer = (props: Props) => (
    <OuterContainer spacing={props.spacing} borderColor={props.borderColor} className={props.className}>
        <InnerContainer spacing={props.innerSpacing} innerColor={props.innerColor}>
            {props.children}
        </InnerContainer>
    </OuterContainer>
);

/**
 * The default props.
 *
 * - borderColor - a dark blue
 * - innerColor - white
 * - spacing - 15px
 */
BorderedContainer.defaultProps = {
    borderColor: theme.color.darkBackground,
    innerColor: theme.color.white,
    spacing: theme.spacing.medium,
    innerSpacing: theme.spacing.medium,
};

export default BorderedContainer;

/**
 * The outer container. Background color is set to the border color.
 */
const OuterContainer = styled.div`
    background-color: ${props => props.borderColor};
    padding: ${props => props.spacing}px;
`;

/**
 * The inner container. Background color is set to the inner color.
 */
const InnerContainer = styled.div`
    width: 100%;
    padding: ${props => props.spacing}px;
    background-color: ${props => props.innerColor};
`;
