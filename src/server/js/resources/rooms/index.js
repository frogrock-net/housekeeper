import express from 'express';

import RoomModel from './model';
import UserModel from '../users/model';

const router = new express.Router();

/**
 * Endpoint for rooms.
 *
 * Returns a list of rooms.
 */
router.get('/', async (req, res, next) => {
    let rooms = await RoomModel.getAll();
    res.json(rooms);
});

export default router;
