import express from 'express';

import User from './model';

const router = new express.Router();

router.get('/', (req, res, next) => {
    return User.find({}, (users, err) => {
        if (err) {
            return next(err);
        }

        res.send(users);
    });
});

export default router;
