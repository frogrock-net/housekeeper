import express from 'express';
import expressJwt from 'express-jwt';

import UserModel from './model';
import passport from '../../passport';
import HouseModel from '../houses/model';

const router = new express.Router();

const auth = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
});

router.get('/', auth, (req, res, next) => {
    return UserModel.findById(req.payload.id, (err, user) => {
        if (err) {
            return next(err);
        }

        res.send(user);
    });
});

export default router;
