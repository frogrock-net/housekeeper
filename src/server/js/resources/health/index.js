import express from 'express';

import HealthModel from './model';
import storage from '../../storage';

const router = new express.Router();
const bucket = 'housekeeper-223422.appspot.com';

const upload = async filename => {
    const [file] = await storage.bucket(bucket).upload(`${filename}`, {
        destination: `images/doggo.png`,
        metadata: { cacheControl: 'public, max-age=31536000' },
    });

    const config = {
        action: 'read',
        expires: '03-17-2025',
    };

    file.getSignedUrl(config, (err, url) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(url);
        console.log('hi');
    });

    const [files] = await storage.bucket(bucket).getFiles({
        prefix: 'images/',
    });

    files.forEach(f => {
        console.log(f.name);
    });
};

/**
 * Basic health-check endpoint.
 *
 * Returns 'hello, world.' plus time when accessed.
 */
router.get('/', (req, res, next) => {
    /*
    const healthCheck = new HealthModel({});
    healthCheck.save(err => {
        if (err) {
            return console.error(err);
        }
    });*/

    upload('/Users/alex/Desktop/doggo.png')
        .then(r => res.send(`hello, world.`))
        .catch(next);
});

export default router;
