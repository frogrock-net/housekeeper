import express from 'express';
import { find } from 'lodash';

import BookingModel from './model';
import UserModel from '../users/model';

const router = new express.Router();

/**
 * Endpoint for bookings.
 *
 * Returns a list of bookings.
 */
router.get('/', async (req, res, next) => {
    let bookings = await BookingModel.getAll();
    res.json(bookings);
});

export default router;
