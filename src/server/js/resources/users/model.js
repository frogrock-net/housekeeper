import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email address`,
        },
    },
    firstName: { type: String, required: true, lowercase: true, trim: true },
    lastName: { type: String, required: true, lowercase: true, trim: true },
    hash: String,
    salt: String,
});

UserSchema.virtual('fullName').get(() => `${this.firstName} ${this.lastName}`);

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateToken = function() {
    return jwt.sign(
        {
            id: this.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

const UserModel = mongoose.model('UserModel', UserSchema);

const endpoints = {
    getAll: () => {
        return UserModel.find().exec();
    },
    getUserByEmail: email => {
        return UserModel.findOne({ email: email }).exec();
    },
    createUser: (root, args) => {
        const { email, firstName, lastName, password } = args;
        const user = UserModel({ email, firstName, lastName });
        user.setPassword(password);

        user.save(err => {
            if (err) {
                next(err);
            }
        });
        return user.generateToken();
    },
    loginUser: async (root, args) => {
        const user = await UserModel.findOne({ email: args.email });

        if (!user) {
            throw new Error('User not found!');
        }

        if (!user.validatePassword(args.password)) {
            throw new Error('Invalid password.');
        }

        return user.generateToken();
    },
};

export default endpoints;
