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

const jwtDecode = require('jwt-decode');

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
            let decoded = jwtDecode(token);
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

const auth = new AuthStore();

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
type LoginRender = (onSubmit: LoginFunction, isLoading: boolean, error: ?Error) => React.Node;

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
    const login = (mutate, { error, loading }, render) => {
        let f = data => {
            console.log(data);
            mutate({ variables: data });
        };

        return <Fragment>{render(f, loading, error)}</Fragment>;
    };

    const wrapper = (mutate, data) => login(mutate, data, children);

    const update = (cache, e) => {
        console.log('in update');
        console.log(e);
        auth.token = e.data.loginUser;
    };

    return (
        <Mutation mutation={AUTHENTICATE} update={update}>
            {wrapper}
        </Mutation>
    );
};

export default auth;
