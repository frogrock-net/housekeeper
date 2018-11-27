require('babel-core/register');
require('dotenv').config();
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import expressJwt from 'express-jwt';
import { readdirSync, statSync } from 'fs';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import path from 'path';
import schema from './schema';

const PORT = process.env.PORT || '8080';

const dirs = p => readdirSync(p).filter(f => statSync(path.join(p, f)).isDirectory());

const app = express();

app.use(cors());
app.use(express.static('build/client/js'));

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

const auth = expressJwt({
    credentialsRequired: false,
    secret: process.env.JWT_SECRET,
    userProperty: 'jwt',
});

app.use(auth);

app.use(
    '/graphql',
    graphqlExpress(req => ({
        schema,
        context: { jwt: req.jwt },
    }))
);

app.use(
    '/graphiql',
    graphiqlExpress({
        endpointURL: '/graphql',
    })
);

app.use('*', function(req, resp) {
    resp.sendFile(path.resolve(`${__dirname}/../../client/js/index.html`));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

let mongoose = require('mongoose');

mongoose.Types.ObjectId.prototype.valueOf = function() {
    return this.toString();
};

// determine which mongodb location we should connect to...
let dbUrl;
if (process.env.MONGODB_URL) {
    // if we've received mongodb credentials from the environment variables, use them.
    console.log(`Connecting to datastore: ${process.env.MONGODB_URL}`);
    dbUrl = `mongodb://${process.env.MONGODB_ACCOUNT}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}`;
} else {
    // if not, try and connect to a local database...
    console.log(`Connecting to local MongoDB.`);
    dbUrl = 'mongodb://127.0.0.1:27017/housekeeper';
}

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
