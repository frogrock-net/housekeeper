// @flow
import * as mongoose from 'mongoose';

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
     * @returns {*} a promise that resolves into the created entity
     */
    create(data: {}) {
        const obj = this.model(data);
        return obj.save();
    }

    /**
     * Fetch an entity object with the provided id.
     *
     * @param id the id to fetch
     * @returns {Promise} a promise that resolves into the found entity
     */
    get(id: string) {
        return this.model.findById(id).exec();
    }

    /**
     * Get each entity object.
     *
     * @returns {*} a promise that resolves into the found entities
     */
    getAll() {
        return this.model.find().exec();
    }

    /**
     * Patch an entity object, updating the object with the fields contained in the data object.
     * @param obj the entity object
     * @param data the object attributes to update
     * @returns {*} a promise that resolves into the updated entity
     */
    patch(obj: mongoose.MongooseDocument, data: {}) {
        if (data) {
            for (const [key, value] of Object.entries(data)) {
                if (value !== undefined) {
                    obj[key] = value;
                }
            }
        }
        return obj.save();
    }

    /**
     * Delete an entity object.
     *
     * @param obj the object to delete
     * @returns {*} a promise that resolves into the deleted object
     */
    delete(obj: mongoose.MongooseDocument) {
        return obj.remove();
    }
}
