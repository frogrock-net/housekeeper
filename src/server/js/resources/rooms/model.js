// @flow
import mongoose from 'mongoose';
import BaseModel from '../model';
import HouseModel from '../houses/model';

/**
 * The 'room' schema, as represented in MongoDB.
 */
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        min: 1,
        required: true,
    },
    description: { type: String },
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HouseModel',
        required: true,
    },
});

/**
 * The 'room' resource class.
 */
class RoomModel extends BaseModel {
    /**
     * Construct the room resource class.
     *
     * Inherits 'create', 'patch', 'get', 'getAll', and 'delete' from the base BaseModel class.
     */
    constructor() {
        super(mongoose.model('RoomModel', schema));
    }

    /**
     * Get each entity object.
     *
     * @param requester the id of the user attempting to perform this
     * @returns {*} a promise that resolves into the found entities
     */
    async getAll(requester: string) {
        throw new Error(`Not supported!`);
    }

    /**
     * Get a list containing all rooms for the provided houseId.
     *
     * @param houseId the house to filter
     * @param requester the id of the user attempting to perform this
     */
    async getByHouse(houseId: string, requester: string) {
        const house = await HouseModel.get(houseId, requester);

        if (house) {
            return this.model.find({ house: houseId }).exec();
        }

        throw new Error(`Not found!`);
    }

    /**
     * Can the requesting user get an entity of this type?
     *
     * @param doc the fetched document
     * @param requester the requesting user id
     * @returns {boolean}
     */
    async canGet(doc: mongoose.MongooseDocument, requester: string) {
        try {
            const house = await HouseModel.get(doc.houseId, requester);
            return !!house;
        } catch (e) {
            return false;
        }
    }

    /**
     * Can the requesting user create entities of this type?
     *
     * @param data the entity to create
     * @param requester the requesting user id
     * @returns {boolean}
     */
    async canCreate(data: { [string]: any }, requester: string) {
        try {
            const house = await HouseModel.get(data.houseId, requester);
            return HouseModel.canCreate(house, requester);
        } catch (e) {
            return false;
        }
    }

    /**
     * Can the requesting user update an entity of this type?
     *
     * @param doc the updated document
     * @param data the data to update
     * @param requester the requesting user id
     * @returns {boolean}
     */
    async canUpdate(doc: mongoose.MongooseDocument, data: { [string]: any }, requester: string) {
        try {
            const house = await HouseModel.get(doc.houseId, requester);
            return HouseModel.canUpdate(house, {}, requester);
        } catch (e) {
            return false;
        }
    }

    /**
     * Can the requesting user delete an entity of this type?
     *
     * @param doc the document to delete
     * @param requester the requesting user id
     * @returns {boolean}
     */
    async canDelete(doc: mongoose.MongooseDocument, requester: string) {
        try {
            const house = await HouseModel.get(doc.houseId, requester);
            return HouseModel.canDelete(house, requester);
        } catch (e) {
            return false;
        }
    }
}

// export a singleton RoomModel.
const resource = new RoomModel();
export default resource;
