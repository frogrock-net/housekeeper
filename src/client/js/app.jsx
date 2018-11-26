// @flow
import React from 'react';
import Home from './components/Home/Home';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import * as config from '../config';
import State from './state/state';

const state = new State();
const StateContext = React.createContext();

/**
 * The highest-level component for the housekeeper application.
 *
 * @constructor
 */
const App = () => (
    <ApolloProvider client={state.client}>
        <StateContext.Provider value={state}>
            <Home />
        </StateContext.Provider>
    </ApolloProvider>
);

export default App;
