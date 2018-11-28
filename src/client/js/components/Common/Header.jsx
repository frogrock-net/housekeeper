import * as React from 'react';
import { StateContext } from '../../app';
import { Fragment } from 'react';
import { Logout } from '../../state/auth';
import styled from 'styled-components';
import Logo from './Logo';

/**
 * Inject the 'auth' state into the Header component.
 *
 * @param props
 */
const Header = props => <StateContext.Consumer>{state => <HeaderComponent {...props} />}</StateContext.Consumer>;

const HeaderComponent = props => (
    <Fragment>
        <Container>
            <Logo color={'white'} size={45} />
            <Logout>{logout => <button onClick={logout}>Log out</button>}</Logout>
        </Container>
    </Fragment>
);

/**
 * A 50px header.
 */
const Container = styled.div`
    height: 50px;
    background: #444;
    display: flex;
    justify-content: space-between;
`;

export default Header;
