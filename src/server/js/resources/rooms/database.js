// @flow
import mongoose from 'mongoose';
import MongooseResource from '../mongoose_resource';

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
class RoomResource extends MongooseResource {
    /**
     * Construct the room resource class.
     *
     * Inherits 'create', 'patch', 'get', 'getAll', and 'delete' from the base MongooseResource class.
     */
    constructor() {
        super(mongoose.model('RoomModel', schema));
    }

    /**
     * Get a list containing all rooms for the provided houseId.
     *
     * @param houseId the house to filter
     */
    getByHouse(houseId: string) {
        return this.model.find({ house: houseId }).exec();
    }
}

// export a singleton RoomResource.
const resource = new RoomResource();
export default resource;
