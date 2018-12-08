// @flow
import * as React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * A loading animation.
 */
const Loading = () => (
    <div>
        <Cube>
            <div />
            <div />
            <div />
            <div />
        </Cube>
    </div>
);

export default Loading;

/**
 * The animation.
 */
const Animation = keyframes`
    0% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
`;

/**
 * The CSS.
 */
const Cube = styled.div`
    width: 150px !important;
    height: 150px !important;
    transform: translate(-75px, -75px) scale(0.75) translate(75px, 75px);
    position: relative;

    div {
        position: absolute;
        width: 70px;
        height: 70px;
        top: 15px;
        left: 15px;
        background: #b3d3e2;

        animation: ${Animation} 1.5s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        animation-delay: -0.5s;
    }

    div:nth-child(2) {
        top: 15px;
        left: 115px;
        background: #e2b3b3;
        animation-delay: -0.25s;
    }

    div:nth-child(3) {
        top: 115px;
        left: 115px;
        background: #d4dec9;
        animation-delay: 0s;
    }

    div:nth-child(4) {
        top: 115px;
        left: 15px;
        background: #ffeab0;
        animation-delay: 0.25s;
    }
`;
