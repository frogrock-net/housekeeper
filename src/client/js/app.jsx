// @flow
import * as React from 'react';
import Home from './components/Home/Home';
import { ApolloProvider } from 'react-apollo';
import State from './state/state';
import { Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import { RequireAuth } from './state/auth';
import { ROUTE_HOUSEKEEPER } from './util/routes';

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
            <Route path={ROUTE_HOUSEKEEPER} render={props => <RequireAuth {...props}>{props => <Dashboard {...props} />}</RequireAuth>} />
            <Route exact path="/" component={Home} />
        </ApolloProvider>
    </StateContext.Provider>
);

export default App;
