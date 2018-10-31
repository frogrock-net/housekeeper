import express from 'express';

import House from './model';

const router = new express.Router();

/**
 * Endpoint for houses.
 *
 * Returns a list of houses.
 */
router.get('/', (req, res, next) => {
    return House.find({}, (houses, err) => {
        if (err) {
            return next(err);
        }
        res.send(houses);
    });
});

export default router;
