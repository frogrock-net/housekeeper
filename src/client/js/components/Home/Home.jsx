// @flow
import React from 'react';
import styled from 'styled-components';
import { Authenticate } from '../../state/auth';

const Home = () => (
    <Background>
        <Authenticate>{loginUser => <button onClick={() => loginUser({ email: 'test', password: 'test' })} />}</Authenticate>
    </Background>
);

const Background = styled.div`
    background-color: #777;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;
export default Home;
