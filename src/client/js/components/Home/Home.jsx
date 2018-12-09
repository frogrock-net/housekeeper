// @flow
import React from 'react';
import styled from 'styled-components';
import Logo from '../Common/Logo';
import Login from './Login';
import { Redirect } from 'react-router-dom';
import { StateContext } from '../../app';
import { ROUTE_HOUSEKEEPER } from '../../util/routes';
import theme from '../../util/theme';

/**
 * Component that renders the home page.
 */
const Home = () => (
    <Background>
        <StateContext.Consumer>{state => (state.auth.token ? <Redirect to={ROUTE_HOUSEKEEPER} /> : null)}</StateContext.Consumer>
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
    background: ${theme.color.darkerGrey};
`;

/**
 * The main 'content' div.
 */
const Content = styled.div`
    height: calc(100vh - 100px);
    background: linear-gradient(
        ${theme.color.darkerGrey},
        ${theme.color.lightBackground} 35%,
        ${theme.color.lightBackground} 75%,
        ${theme.color.lightAlternate} 95%
    );
`;

const ContentContainer = styled.div`
    padding-top: 150px;
`;

/**
 * A 50px footer.
 */
const Footer = styled.div`
    height: 50px;
    background: ${theme.color.lightAlternate};
`;

/**
 * Container div containing the Housekeeper logo.
 */
const LogoContainer = styled.div`
    display: flex;
    justify-content: center;

    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
`;

/**
 * Container div containing the login form.
 */
const LoginContainer = styled.div`
    display: flex;
    justify-content: center;

    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
`;

export default Home;
