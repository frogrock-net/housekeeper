import express from 'express';

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
