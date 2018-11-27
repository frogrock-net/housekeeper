// @flow
import * as React from 'react';
import Home from './components/Home/Home';
import { ApolloProvider } from 'react-apollo';
import State from './state/state';

const state = new State();
const StateContext: React.Context<State> = React.createContext();

/**
 * The highest-level component for the housekeeper application.
 *
 * @constructor
 */
const App = () => (
    <StateContext.Provider value={state}>
        <ApolloProvider client={state.client}>
            <Home />
        </ApolloProvider>
    </StateContext.Provider>
);

export default App;
