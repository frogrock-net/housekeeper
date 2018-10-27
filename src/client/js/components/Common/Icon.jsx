// @flow
import React from 'react';

/**
 * The 'Housekeeper' icon.
 *
 * It looks like a house.
 *
 * @constructor
 */
export const Housekeeper = ({
    className,
    color,
}: {
    className?: string,
    color?: string,
}) => (
    <div className={className}>
        <svg fill={color || 'white'} viewBox="0 0 24 24">
            <path d="M6,21V8A2,2 0 0,1 8,6L16,3V6A2,2 0 0,1 18,8V21H12V16H8V21H6M14,19H16V16H14V19M8,13H10V9H8V13M12,13H16V9H12V13Z" />
        </svg>
    </div>
);
