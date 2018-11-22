import express from 'express';
import passport from '../../passport';

import UserModel from './model';

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
