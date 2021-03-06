import * as React from 'react';
import { StateContext } from '../../app';
import { Fragment } from 'react';
import { Logout } from '../../state/auth';
import styled from 'styled-components';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import theme from '../../util/theme';

/**
 * Inject the 'auth' state into the Header component.
 *
 * @param props
 */
const Header = props => <StateContext.Consumer>{state => <HeaderComponent {...props} />}</StateContext.Consumer>;

/**
 * An extremely-WIP header component.
 */
const HeaderComponent = props => (
    <Fragment>
        <Container>
            <Link to={'/'}>
                <Logo color={theme.color.white} size={45} />
            </Link>
            <Logout>{logout => <button onClick={logout}>Log out</button>}</Logout>
        </Container>
    </Fragment>
);

/**
 * A 50px header.
 */
const Container = styled.div`
    height: 50px;
    background: ${theme.color.darkerGrey};
    display: flex;
    justify-content: space-between;
`;

export default Header;
