import AuthStore from './auth';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import * as config from '../../config';

/**
 * State object.
 */
export default class State {
    auth = AuthStore;
    client: ApolloClient;

    constructor() {
        this.client = new ApolloClient({
            link: ApolloLink.from([
                onError(({ graphQLErrors, networkError }) => {
                    if (graphQLErrors)
                        graphQLErrors.map(({ message, locations, path }) =>
                            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
                        );
                    if (networkError) console.log(`[Network error]: ${networkError}`);
                }),
                setContext((_, { headers }) => {
                    // get the authentication token from local storage if it exists
                    const token = this.auth.token;
                    // return the headers to the context so httpLink can read them
                    return {
                        headers: {
                            ...headers,
                            authorization: token ? `Bearer ${token}` : '',
                        },
                    };
                }),
                new HttpLink({
                    uri: `${config.API_URL}`,
                }),
            ]),
            cache: new InMemoryCache(),
        });
    }
}
