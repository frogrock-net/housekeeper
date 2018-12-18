// @flow
import mongoose from 'mongoose';
import { ForbiddenError } from 'apollo-server-express';

/**
 * A simple mongoose model class that provides basic CRUD operations on an entity object.
 *
 * Should be extended for specific entities.
 */
export default class BaseModel {
    model: mongoose.MongooseModel;

    /**
     * Construct a mongoose resource class with the provided model type.
     *
     * @param model the mongoose model
     */
    constructor(model: mongoose.MongooseModel) {
        this.model = model;
    }

    /**
     * Create/insert a new entity object into the database.
     *
     * @param data the object attributes
     * @param requester the id of the user attempting to perform this
     * @returns {*} a promise that resolves into the created entity
     */
    async create(data: {}, requester: string) {
        const authorized = await this.canCreate(data, requester);
        if (authorized) {
            const obj = this.model(data);
            return obj.save();
        } else {
            throw new Error(`Can't create!`);
        }
    }

    /**
     * Fetch an entity object with the provided id.
     *
     * @param id the id to fetch
     * @param requester the id of the user attempting to perform this
     * @returns {Promise} a promise that resolves into the found entity
     */
    async get(id: string, requester: string) {
        const doc = await this.model.findById(id).exec();
        const authorized = await this.canGet(doc, requester);
        if (authorized) {
            return doc;
        }

        throw new Error(`Not found!`);
    }

    /**
     * Get each entity object.
     *
     * @param requester the id of the user attempting to perform this
     * @returns {*} a promise that resolves into the found entities
     */
    async getAll(requester: string) {
        const docs = await this.model.find().exec();
        return filter(docs, async doc => await this.canGet(doc, requester));
    }

    /**
     * Patch an entity object, updating the object with the fields contained in the data object.
     *
     * @param data the object attributes to update
     * @param requester the id of the user attempting to perform this
     * @returns {*} a promise that resolves into the updated entity
     */
    async patch(data: { [string]: any }, requester: string) {
        const doc = await this.get(data.id, requester);
        const authorized = await this.canUpdate(doc, data, requester);

        if (authorized) {
            mergeInto(doc, data);
            return doc.save();
        } else {
            throw new ForbiddenError(`Can't update!`);
        }
    }

    /**
     * Delete an entity object.
     *
     * @param id the object id to delete
     * @param requester the id of the user attempting to perform this
     * @returns {*} a promise that resolves into the deleted object
     */
    async delete(id: string, requester: string) {
        const doc = await this.get(id, requester);
        if (this.canDelete(doc, requester)) {
            return doc.remove();
        }
    }

    /**
     * Can the requesting user get an entity of this type?
     *
     * @param doc the fetched document
     * @param requester the requesting user id
     * @returns {boolean}
     */
    async canGet(doc: mongoose.MongooseDocument, requester: string) {
        return true;
    }

    /**
     * Can the requesting user create entities of this type?
     *
     * @param data the entity to create
     * @param requester the requesting user id
     * @returns {boolean}
     */
    async canCreate(data: {}, requester: string) {
        return true;
    }

    /**
     * Can the requesting user update an entity of this type?
     *
     * @param doc the updated document
     * @param data the data to update
     * @param requester the requesting user id
     * @returns {boolean}
     */
    async canUpdate(doc: mongoose.MongooseDocument, data: {}, requester: string) {
        return true;
    }

    /**
     * Can the requesting user delete an entity of this type?
     *
     * @param doc the document to delete
     * @param requester the requesting user id
     * @returns {boolean}
     */
    async canDelete(doc: mongoose.MongooseDocument, requester: string) {
        return true;
    }
}

/**
 * Check if the provided object is a Javascript dictionary.
 *
 * @param obj the object to check
 * @returns {boolean}
 */
const isDict = obj => {
    if (!obj) {
        return false;
    }

    if (obj.constructor != Object) {
        return false;
    }

    return true;
};

/**
 * Map that works with async functions.
 *
 * @param obj
 * @param cb
 */
const map = (obj, cb) => Promise.all(obj.map(cb));

/**
 * Filter that works with async functions.
 *
 * @param obj
 * @param cb
 */
const filter = async (obj, cb) => {
    const results = await map(obj, cb);
    return obj.filter((val, i) => results[i]);
};

/**
 * Deep-merge the data into the target object.
 *
 * @param target the target object
 * @param data the data to merge
 * @returns the target object
 */
const mergeInto = (target, data) => {
    for (const [key, value] of Object.entries(data)) {
        if (isDict(value)) {
            target[key] = mergeInto(target[key], value);
        } else if (value !== undefined) {
            target[key] = value;
        }
    }

    return target;
};
