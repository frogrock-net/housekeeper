import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserModel from './resources/users/model';

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (username, password, next) => {
        UserModel.findOne({ email: username }, (err, user) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return next(null, false, { message: 'User not found!' });
            }

            if (!user.validatePassword(password)) {
                return next(null, false, { message: 'Invalid password.' });
            }

            return next(null, user);
        });
    })
);

export default passport;
