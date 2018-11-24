import express from 'express';

import HouseModel from './model';
import UserModel from '../users/model';

const router = new express.Router();

/**
 * Endpoint for houses.
 *
 * Returns a list of houses.
 */
router.get('/', async (req, res, next) => {
    let houses = await HouseModel.getAll();
    res.json(houses);
});

export default router;
