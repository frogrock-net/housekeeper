import * as React from 'react';
import { StateContext } from '../../app';
import { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Logout } from '../../state/auth';

/**
 * Inject the 'auth' state into the Header component.
 *
 * @param props
 */
const Header = props => <StateContext.Consumer>{state => <HeaderComponent {...props} />}</StateContext.Consumer>;

const HeaderComponent = props => (
    <Fragment>
        <Logout>{logout => <button onClick={logout}>Log out</button>}</Logout>
    </Fragment>
);

export default Header;
