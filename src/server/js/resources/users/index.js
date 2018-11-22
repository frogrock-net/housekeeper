import express from 'express';
import expressJwt from 'express-jwt';

import UserModel from './model';
import passport from '../../passport';

const router = new express.Router();

const auth = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
});

router.get('/', auth, (req, res, next) => {
    console.log(req.payload);
    return UserModel.find({}, (err, users) => {
        if (err) {
            return next(err);
        }

        res.send(users);
    });
});

export default router;
