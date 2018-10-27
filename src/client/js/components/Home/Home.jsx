// @flow
import React from 'react';
import styled from 'styled-components';
import Logo from '../Common/Logo';

const Home = () => (
    <Background>
        <Header />
        <Content>
            <Logo size={100} />
        </Content>
        <Footer />
    </Background>
);

const Background = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
`;

const Header = styled.div`
    height: 50px;
    background: #444;
`;

const Content = styled.div`
    height: calc(100vh - 50px);
    background: linear-gradient(#444, #b3d3e2 50%, #ffeab0 75%);
`;

const Footer = styled.div`
    height: 200px;
    background: #444;
`;

export default Home;
