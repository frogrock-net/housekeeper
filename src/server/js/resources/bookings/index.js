import express from 'express';
import { find } from 'lodash';

import BookingModel from './model';

const router = new express.Router();

/**
 * Endpoint for bookings.
 *
 * Returns a list of bookings.
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
