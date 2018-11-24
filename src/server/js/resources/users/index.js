import express from 'express';

import UserModel from './model';

const router = new express.Router();

router.get('/', async (req, res, next) => {
    let users = await UserModel.getAll();
    res.json(users);
});

export default router;
