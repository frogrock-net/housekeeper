/**
 * An error handling function.
 *
 * Currently, it doesn't do anything interesting.
 *
 * @param err the error
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export default (err, req, res, next) => {
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
};
