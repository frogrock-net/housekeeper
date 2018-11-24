require('babel-core/register');
import bodyParser from 'body-parser';
import express from 'express';
import expressJwt from 'express-jwt';
import { readdirSync, statSync } from 'fs';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import path from 'path';

import schema from './schema';

const PORT = process.env.PORT || '8080';

const dirs = p => readdirSync(p).filter(f => statSync(path.join(p, f)).isDirectory());

const app = express();

app.use(express.static('build'));

// error handling is still a WIP.
app.use((err, req, res, next) => {
    // send to console for logging
    console.error(err);

    const msg = err.message || err;

    switch (err.name) {
        case 'SyntaxError':
            res.status(400).json(msg);
            break;
        case 'UnauthorizedError':
            res.status(401).json(msg);
            break;
        default:
            if (err.status) {
                res.status(err.status).json(msg);
            } else {
                res.status(500).json(msg);
            }
            break;
    }
});

console.log(`Starting housekeeper server!`);

dirs(`${__dirname}/resources`).forEach(dir => {
    const api = require(`./resources/${dir}`).default;
    console.log(`\tLoading API resource: ${dir}`);
    app.use(`/api/${dir}`, api);
});

app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/', routes);

app.use(
    '/graphql',
    graphqlExpress({
        schema,
    })
);

app.use(
    '/graphiql',
    graphiqlExpress({
        endpointURL: '/graphql',
    })
);

app.use('*', function(req, resp) {
    resp.sendFile(path.resolve(`${__dirname}/../../../build/index.html`));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

let mongoose = require('mongoose');
const dbUrl = 'mongodb://127.0.0.1:27017/housekeeper';
mongoose.connect(
    dbUrl,
    // see dep warnings: https://mongoosejs.com/docs/deprecations.html
    {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
    }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
