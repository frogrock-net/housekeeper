import express from 'express';

import User from './model';

const router = new express.Router();

router.get('/', (req, res, next) => {
    return User.find({}, (err, users) => {
        if (err) {
            return next(err);
        }

        res.send(users);
    });
});

export default router;
