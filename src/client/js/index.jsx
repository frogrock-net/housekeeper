import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import App from './app.jsx';

/**
 * The application entry point.
 *
 * Renders the entrypoint component (App).
 */
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector('#app')
);

if (module && module.hot) {
    module.hot.accept('./app.jsx', () => {
        const App = require('./app.jsx').default;
        ReactDOM.render(
            <AppContainer>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AppContainer>,
            document.querySelector('#app')
        );
    });
}
