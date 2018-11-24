import express from 'express';

import UserModel from './model';
import HouseModel from '../houses/model';

const router = new express.Router();

router.get('/', (req, res, next) => {
    return UserModel.find({}, (err, users) => {
        if (err) {
            return next(err);
        }

        res.send(users);
    });
});

export default router;
