import express from 'express';

import UserModel from './model';
import HouseModel from '../houses/model';

const router = new express.Router();

router.get('/', (req, res, next) => {
    return UserModel.findById(req.payload.id, (err, user) => {
        if (err) {
            return next(err);
        }

        res.send(user);
    });
});

export default router;
