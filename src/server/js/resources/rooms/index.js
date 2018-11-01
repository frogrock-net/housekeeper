import express from 'express';

import RoomModel from './model';

const router = new express.Router();

/**
 * Endpoint for houses.
 *
 * Returns a list of houses.
 */
router.get('/', (req, res, next) => {
    RoomModel.find()
        .populate('house')
        .exec((err, rooms) => {
            if (err) {
                return next(err);
            }
            res.json(rooms);
        });
});

export default router;
