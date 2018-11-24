import express from 'express';

import HouseModel from './model';

const router = new express.Router();

/**
 * Endpoint for houses.
 *
 * Returns a list of houses.
 */
router.get('/', (req, res, next) => {
    HouseModel.find({}, (err, houses) => {
        if (err) {
            return next(err);
        }
        res.json(houses);
    });
});

export default router;
