// @flow
import React from 'react';
import styled from 'styled-components';
import { Housekeeper } from './Icon';

type Props = {
    color: string,
    size: number,
};

const Logo = (props: Props) => (
    <LogoContainer {...props}>
        <Housekeeper {...props} />
        <LogoText {...props}>Housekeeper</LogoText>
    </LogoContainer>
);

Logo.defaultProps = {
    color: 'white',
    size: 36,
};

const LogoContainer = styled.div`
    display: flex;
    height: ${props => props.size}px;
    padding-right: ${props => props.size / 4}px;
    user-select: none;
`;

const LogoText = styled.div`
    color: ${props => props.color};
    font-family: 'Arvo', sans-serif;
    line-height: ${props => Math.round(props.size * 1.1)}px;
    font-size: ${props => Math.round(props.size * 1.1) / 2}px;
`;

export default Logo;
