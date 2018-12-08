// @flow
import React from 'react';
import styled from 'styled-components';

/**
 * The props supported by the Icon components.
 *
 * - className - a css class name to override this icon's styles
 * - color - the color for the icon
 * - size - the size of the icon. icons are square.
 */
type Props = {
    className?: string,
    color?: string,
    size: number,
};

/**
 * Construct a generic Icon component.
 */
const Icon = ({ className, color, size, path }: { className?: string, color?: string, path: string, size: number }) => (
    <IconContainer color={color} size={size} className={className}>
        <svg viewBox="0 0 24 24">
            <path d={path} />
        </svg>
    </IconContainer>
);

/**
 * A styled div for an Icon component.
 */
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

/**
 * A 'house' icon.
 *
 * It looks like a boring house.
 *
 * @constructor
 */
export const HouseIcon = (props: Props) => <Icon {...props} path={'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'} />;

/**
 * An 'add item' icon.
 *
 * It looks like a '+'.
 *
 * @constructor
 */
export const AddIcon = (props: Props) => <Icon {...props} path={'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'} />;

/**
 * An 'error' icon.
 *
 * It looks like a filled circle with a '!'.
 *
 * @constructor
 */
export const ErrorIcon = (props: Props) => (
    <Icon {...props} path={'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'} />
);

/**
 * A 'bed' icon.
 *
 * It looks like a person sleeping in a bed.
 *
 * @constructor
 */
export const BedIcon = (props: Props) => (
    <Icon
        {...props}
        path={'M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z'}
    />
);

/**
 * A 'notes' icon.
 *
 * It looks like a bunch of horizontal lines, kind of like a paragraph.
 *
 * @constructor
 */
export const NotesIcon = (props: Props) => <Icon {...props} path={'M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z'} />;
