// @flow
import React from 'react';
import styled from 'styled-components';
import Logo from '../Common/Logo';
import Login from './Login';

/**
 * Component that renders the home page.
 */
const Home = () => (
    <Background>
        <Header />
        <Content>
            <ContentContainer>
                <LogoContainer>
                    <Logo size={100} />
                </LogoContainer>
                <LoginContainer>
                    <Login />
                </LoginContainer>
            </ContentContainer>
        </Content>
        <Footer />
    </Background>
);

/**
 * The background.
 */
const Background = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
`;

/**
 * A 50px header.
 */
const Header = styled.div`
    height: 50px;
    background: #444;
`;

/**
 * The main 'content' div.
 */
const Content = styled.div`
    height: calc(100vh - 100px);
    background: linear-gradient(#444, #b3d3e2 50%, #ffeab0 75%);
`;

const ContentContainer = styled.div`
    padding-top: 150px;
`;

/**
 * A 50px footer.
 */
const Footer = styled.div`
    height: 50px;
    background: #ffeab0;
`;

/**
 * Container div containing the Housekeeper logo.
 */
const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
`;

/**
 * Container div containing the login form.
 */
const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export default Home;
