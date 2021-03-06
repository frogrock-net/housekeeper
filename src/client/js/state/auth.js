// @flow
/**
 * Responsible for:
 * - authenticating the user with the server
 * - storing and retrieving the token we get
 * - clearing auth data when a logout request is received
 */
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import * as React from 'react';
import { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

/**
 * Authentication store.
 *
 * Stores and retrieves the authentication token.
 */
class AuthStore {
    _token = null;
    _id = null;

    /**
     * Construct an AuthStore, initializing the auth token from from localstorage if it exists.
     */
    constructor() {
        this.token = localStorage.getItem('token');
    }

    /**
     * Set the auth token.
     *
     * Update the token in localstorage, too.
     *
     * @param token the token to set
     */
    set token(token: ?string) {
        this._token = token;
        if (token) {
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            this._id = decoded.id;
        } else {
            localStorage.removeItem('token');
            this._id = null;
        }
    }

    /**
     * Get the auth token.
     *
     * @returns the auth token
     */
    get token() {
        return this._token;
    }
}

// the singleton auth object.
const auth = new AuthStore();
export default auth;

/**
 * GraphQL query mutation. Authenticate a user given their email and password, and receive a signed JWT in response.
 */
const AUTHENTICATE = gql`
    mutation Authenticate($email: String!, $password: String!) {
        loginUser(email: $email, password: $password)
    }
`;

/**
 * Type signature for the login request object.
 */
type LoginRequest = {
    email: string,
    password: string,
};

/**
 * The type signature for the login request function.
 */
type LoginFunction = LoginRequest => void;

/**
 * The type signature for the render prop for the Authenticate component.
 *
 */
type LoginRender = (onSubmit: LoginFunction, isLoading: boolean, isSuccess: boolean, error: ?Error) => React.Node;

/**
 * Props expected by the Authenticate component.
 *
 * Requires a render function passed as a child component.
 */
type Props = {
    children: LoginRender,
};

/**
 * Authenticate mutator component.
 *
 * @param children a render function
 * @returns {*}
 * @constructor
 */
export const Authenticate = ({ children }: Props) => {
    const login = (mutate, { data, error, loading }, render) => {
        const f = input => {
            if (input.email && input.password) {
                mutate({ variables: input });
            }
        };

        const success = !!data && !!data.loginUser;
        return <Fragment>{render(f, loading, success, error)}</Fragment>;
    };

    const wrapper = (mutate, data) => login(mutate, data, children);

    const update = (cache, e) => {
        auth.token = e.data.loginUser;
    };

    return (
        <Mutation mutation={AUTHENTICATE} update={update}>
            {wrapper}
        </Mutation>
    );
};

/**
 * Type definition for the props accepted by the Logout component.
 */
type LogoutProps = {
    children: (logout: () => void, props: {}) => React.Node,
};

/**
 * State maintained by the Logout component.
 */
type LogoutState = {
    isAuthed: boolean,
};

/**
 * The Logout component.
 *
 * Accepts a render prop (as a child), and passes the 'logout' function to the child.
 *
 * If the user is logged out, redirects to the login page.
 */
export class Logout extends React.Component<LogoutProps, LogoutState> {
    state = {
        isAuthed: !!auth.token,
    };

    constructor(props: LogoutProps) {
        super(props);
    }

    logout = () => {
        auth.token = null;
        this.setState({ isAuthed: false });
    };

    render() {
        const { children, ...rest } = this.props;
        return !this.state.isAuthed ? (
            <Redirect
                to={{
                    pathname: '/',
                }}
            />
        ) : (
            children(this.logout, rest)
        );
    }
}

/**
 * Type definition for the props accepted by the RequireAuth component.
 */
type RequireAuthProps = {
    children: (props: {}) => React.Node,
    referrer: string,
};

/**
 * The RequireAuth component.
 *
 * Accepts a render prop (as a child).
 *
 * If the user is logged in, displays the child component. If the user is logged out, redirects to the login page.
 */
export const RequireAuth = (props: RequireAuthProps) => {
    const { children, ...rest } = props;

    return (
        <Fragment>
            {!auth.token ? (
                <Redirect
                    to={{
                        pathname: '/',
                        state: {
                            referrer: rest.referrer,
                        },
                    }}
                />
            ) : (
                children(rest)
            )}
        </Fragment>
    );
};
