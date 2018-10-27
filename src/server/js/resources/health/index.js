import express from 'express';
const router = new express.Router();

/**
 * Basic health-check endpoint.
 *
 * Returns 'hello, world.' when accessed.
 */
router.get('/', (req, res) => res.send('hello, world.'));

export default router;
