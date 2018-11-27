// @flow
import * as React from 'react';
import Home from './components/Home/Home';
import { ApolloProvider } from 'react-apollo';
import State from './state/state';
import { Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

const state = new State();
export const StateContext: React.Context<State> = React.createContext();

/**
 * The highest-level component for the housekeeper application.
 *
 * @constructor
 */
const App = () => (
    <StateContext.Provider value={state}>
        <ApolloProvider client={state.client}>
            <Route path={'/dashboard'} render={props => <Dashboard />} />
            <Route exact path="/" component={Home} />
        </ApolloProvider>
    </StateContext.Provider>
);

export default App;
