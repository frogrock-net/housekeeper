import express from 'express';

import HealthModel from './health';

const router = new express.Router();

/**
 * Basic health-check endpoint.
 *
 * Returns 'hello, world.' plus time when accessed.
 */
router.get('/', (req, res) => {
    const healthCheck = new HealthModel({});
    healthCheck.save(err => {
        if (err) {
            return console.error(err);
        }
    });

    res.send(`hello, world.  ${healthCheck.checkedOn}`);
});

export default router;
