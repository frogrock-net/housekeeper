// @flow
import mongoose from 'mongoose';
import validator from 'validator';
import BaseModel from '../model';

/**
 * The 'house' schema, as represented in MongoDB.
 */
const schema = new mongoose.Schema({
    address: {
        street: String,
        city: String,
        state: String,
        zip: {
            type: String,
            validate: {
                validator: value => validator.isPostalCode(value, 'US'),
                message: props => `${props.value} is not a valid US zipcode`,
            },
        },
    },
    administrators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
            required: true,
        },
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
            default: [],
        },
    ],
    name: {
        type: String,
        required: true,
    },
    description: String,
});

/**
 * The 'house' resource class.
 */
class HouseModel extends BaseModel {
    /**
     * Construct the house resource class.
     *
     * Inherits 'create', 'get', 'getAll', and 'delete' from the base BaseModel class.
     */
    constructor() {
        super(mongoose.model('HouseModel', schema));
    }

    /**
     * Get all houses that are administered by the provided administrator id.
     *
     * @param adminId the administrator id to check
     */
    getByAdministrator(adminId: string) {
        return this.model.find({ administrators: adminId }).exec();
    }

    /**
     * Get all houses that are administered by the provided administrator id.
     *
     * @param adminId the administrator id to check
     */
    getByMember(adminId: string) {
        return this.model.find({ members: adminId }).exec();
    }

    /**
     * Patch a house entity, updating the house with the fields contained in the attributes object.
     * @param house the entity object
     * @param attributes the object attributes to update
     * @returns {*} a promise that resolves into the updated entity
     */
    patch(house: mongoose.MongooseDocument, attributes: { [string]: any }) {
        // only allow these fields to be edited
        const UPDATABLE_FIELDS = ['administrators', 'description', 'members', 'name'];
        const UPDATABLE_ADDRESS_FIELDS = ['street', 'city', 'state', 'zip'];

        UPDATABLE_FIELDS.forEach(field => {
            if (attributes[field] !== undefined) {
                house[field] = attributes[field];
            }
        });

        if (attributes.address) {
            UPDATABLE_ADDRESS_FIELDS.forEach(field => {
                if (attributes.address[field] !== undefined) {
                    house.address[field] = attributes.address[field];
                }
            });
        }

        return house.save();
    }
}

// export a singleton HouseModel.
const resource = new HouseModel();
export default resource;
