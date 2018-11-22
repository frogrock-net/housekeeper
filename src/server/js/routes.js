import express from 'express';

import passport from './passport';
import UserModel from './resources/users/model';

const router = new express.Router();

router.post('/login', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.status(404).json(err);
            return;
        }

        if (user) {
            const token = user.generateToken();
            res.status(200).json({ token });
        } else {
            res.status(404).json(info);
        }
    })(req, res);
});

router.post('/signup', (req, res, next) => {
    const user = UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    user.setPassword(req.body.password);

    user.save(err => {
        if (err) {
            next(err);
        }

        const token = user.generateToken();
        res.status(200);
        res.json({ token });
    });
});

export default router;
