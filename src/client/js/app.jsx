// @flow
import React from 'react';
import Home from './components/Home/Home';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import * as config from '../config';

const client = new ApolloClient(`${config.API_URL}/graphql`);

/**
 * The highest-level component for the housekeeper application.
 *
 * @constructor
 */
const App = () => (
    <ApolloProvider client={client}>
        <Home />
    </ApolloProvider>
);

export default App;
