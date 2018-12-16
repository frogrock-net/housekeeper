require('babel-core/register');
require('dotenv').config();
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import expressJwt from 'express-jwt';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import path from 'path';
import schema from './schema';
import errorHandler from './error';
import mongoose from './mongoose';

const PORT = process.env.PORT || '8080';

/**
 * Configure the express server!
 *
 * @param app the express app
 */
const configure = app => {
    const auth = expressJwt({
        credentialsRequired: false,
        secret: process.env.JWT_SECRET,
        userProperty: 'jwt',
    });

    app.use(cors());
    app.use(express.static('build/client/js'));
    app.use(errorHandler);
    app.use(bodyParser.json());
    app.use(auth);

    // configure the graphql endpoint
    app.use(
        '/graphql',
        graphqlExpress(req => ({
            schema,
            context: { jwt: req.jwt },
        }))
    );

    // set up the graphiql endpoint.
    // we should probably disable this for non-dev...
    app.use(
        '/graphiql',
        graphiqlExpress({
            endpointURL: '/graphql',
        })
    );

    // any other route should be directed at the front-end
    app.use('*', function(req, resp) {
        resp.sendFile(path.resolve(`${__dirname}/../../client/js/index.html`));
    });
};

console.log(`Starting housekeeper server!`);
mongoose().catch(err => console.error(`Couldn't connect to database...`));
const app = express();

configure(app);

// start listening for web traffic!
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
