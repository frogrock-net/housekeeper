// @flow
import mongoose from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import BaseModel from '../model';
import { ForbiddenError } from 'apollo-server-express';

/**
 * The 'user' schema, as represented in MongoDB.
 */
const schema = new mongoose.Schema({
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
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    hash: String,
    salt: String,
});

schema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

schema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

schema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

schema.methods.generateToken = function() {
    return jwt.sign(
        {
            id: this.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

/**
 * The 'user' resource class.
 */
class UserModel extends BaseModel {
    /**
     * Construct the user resource class.
     *
     * Inherits 'get', 'getAll', and 'delete' from the base BaseModel class.
     */
    constructor() {
        super(mongoose.model('UserModel', schema));
    }

    /**
     * A user can get themselves.
     *
     * @param doc the fetched document
     * @param requester the requesting user id
     * @returns {boolean}
     */
    canGet(doc: mongoose.MongooseDocument, requester: string) {
        return requester == doc.id;
    }

    /**
     * Everyone can create users (for now).
     *
     * @param data the entity to create
     * @param requester the requesting user id
     * @returns {boolean}
     */
    canCreate(data: {}, requester: string) {
        return true;
    }

    /**
     * A user can update themselves.
     *
     * @param doc the updated document
     * @param data the data to update
     * @param requester the requesting user id
     * @returns {boolean}
     */
    canUpdate(doc: mongoose.MongooseDocument, data: {}, requester: string) {
        return requester == doc.id;
    }

    /**
     * A user can delete themselves.
     *
     * @param doc the document to delete
     * @param requester the requesting user id
     * @returns {boolean}
     */
    canDelete(doc: mongoose.MongooseDocument, requester: string) {
        return requester == doc.id;
    }

    /**
     * Authenticate a user, checking the provided credentials and returning a signed JWT.
     *
     * @param email the e-mail to check
     * @param password the password
     */
    async authenticate(email: string, password: string) {
        const user = await this.model.findOne({ email }).exec();

        if (!user) {
            throw new Error('User not found!');
        }

        if (!user.validatePassword(password)) {
            throw new Error('Invalid password.');
        }

        return {
            user: user,
            token: user.generateToken(),
        };
    }

    /**
     * Create/insert a new user object into the database.
     *
     * @param data the object attributes
     * @param requester the requesting user id
     * @returns {*} a promise that resolves into the created entity
     */
    create(data: { [string]: any }, requester: string) {
        if (this.canCreate(data, requester)) {
            const { email, firstName, lastName, password } = data;
            const user = this.model({
                email,
                firstName,
                lastName,
            });

            user.setPassword(password);

            return user.save();
        }

        throw new ForbiddenError('Not allowed to create users!');
    }

    /**
     * Patch a user object, updating the object with the fields contained in the data object.
     *
     * @param data the object attributes to update
     * @param requester the requesting user id
     * @returns {*} a promise that resolves into the updated entity
     */
    patch(data: { [string]: any }, requester: string) {
        const user = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
        };

        return super.patch(user, requester);
    }
}

// export a singleton UserModel.
const resource = new UserModel();
export default resource;
