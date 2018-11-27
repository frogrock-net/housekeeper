// @flow
import React from 'react';
import styled from 'styled-components';

type Props = {
    className?: string,
    color?: string,
    size: number,
};

const Icon = ({ className, color, size, path }: { className?: string, color?: string, path: string, size: number }) => (
    <IconContainer color={color} size={size} className={className}>
        <svg viewBox="0 0 24 24">
            <path d={path} />
        </svg>
    </IconContainer>
);

const IconContainer = styled.div`
    height: ${props => props.size}px;
    width: ${props => props.size}px;

    svg {
        fill: ${props => props.color};
    }
`;

/**
 * The 'Housekeeper' icon.
 *
 * It looks like a house.
 *
 * @constructor
 */
export const Housekeeper = (props: Props) => (
    <Icon
        {...props}
        path={'M6,21V8A2,2 0 0,1 8,6L16,3V6A2,2 0 0,1 18,8V21H12V16H8V21H6M14,19H16V16H14V19M8,13H10V9H8V13M12,13H16V9H12V13Z'}
    />
);

/**
 * An 'email' icon.
 *
 * It looks like an envelope, because for some reason an envelope is associated with e-mail addresses.
 *
 * @constructor
 */
export const Email = (props: Props) => (
    <Icon
        {...props}
        path={'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'}
    />
);

/**
 * A 'lock' icon.
 *
 * It looks like a padlock.
 *
 * @constructor
 */
export const Lock = (props: Props) => (
    <Icon
        {...props}
        path={
            'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z'
        }
    />
);
