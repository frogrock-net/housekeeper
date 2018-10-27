require('babel-core/register');

const PORT = process.env.PORT || '8080';

const express = require('express');
const path = require('path');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');

const dirs = p =>
    readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());

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

app.use('*', function(req, resp) {
    resp.sendFile(path.resolve(`${__dirname}/../../../build/index.html`));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
