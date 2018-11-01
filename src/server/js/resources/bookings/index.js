import express from 'express';
import { find } from 'lodash';

import BookingModel from './model';

const router = new express.Router();

/**
 * Endpoint for houses.
 *
 * Returns a list of houses.
 */
router.get('/', (req, res, next) => {
    BookingModel.find({})
        .populate('room')
        .exec((err, bookings) => {
            if (err) {
                return next(err);
            }
            res.json(bookings);
        });
});

export default router;
