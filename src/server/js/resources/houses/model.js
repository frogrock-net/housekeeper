// @flow
import mongoose from 'mongoose';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import validator from 'validator';
import BaseModel from '../model';
import UserModel from '../users/model';

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
     * Inherits 'create', 'patch', 'get', 'getAll', and 'delete' from the base BaseModel class.
     */
    constructor() {
        super(mongoose.model('HouseModel', schema));
    }

    /**
     * Get each entity object.
     *
     * @param requester the id of the user attempting to perform this
     * @returns {*} a promise that resolves into the found entities
     */
    async getAll(requester: string) {
        if (requester) {
            return this.model
                .find()
                .or({ administrators: requester }, { members: requester })
                .exec();
        } else {
            throw AuthenticationError(`Must authenticate to get houses.`);
        }
    }

    /**
     * Add an administrator to a house.
     *
     * @param houseId the house to update
     * @param userId the user to make an administrator
     * @param requester the id of the user attempting to perform this
     * @returns {Promise<void>}
     */
    async addAdministrator(houseId: string, userId: string, requester: string) {
        const house = await this.get(houseId, requester);
        const authorized = await this.canUpdate(house, {}, requester);

        if (authorized) {
            const newAdmin = await UserModel.get(userId, userId);

            if (!newAdmin) {
                throw new Error(`Can't find the user!`);
            }

            if (!house.administrators.find(admin => admin == userId)) {
                house.administrators.push(userId);
                return house.save();
            }

            return house;
        }

        throw new ForbiddenError(`Not allowed to update this house!`);
    }

    /**
     * Add a member to a house.
     *
     * @param houseId the house to update
     * @param userId the user to make a member
     * @param requester the id of the user attempting to perform this
     * @returns {Promise<void>}
     */
    async addMember(houseId: string, userId: string, requester: string) {
        const house = await this.get(houseId, requester);
        const authorized = await this.canUpdate(house, {}, requester);

        if (authorized) {
            const newMember = await UserModel.get(userId, userId);

            if (!newMember) {
                throw new Error(`Can't find the user!`);
            }

            if (!house.members.find(member => member == userId)) {
                house.members.push(userId);
                return house.save();
            }

            return house;
        }

        throw new ForbiddenError(`Not allowed to update this house!`);
    }

    /**
     * Remove a member from a house.
     *
     * @param houseId the house to update
     * @param userId the user to remove from the house
     * @param requester the id of the user attempting to perform this
     * @returns {Promise<void>}
     */
    async removeMember(houseId: string, userId: string, requester: string) {
        const house = await this.get(houseId, requester);
        const authorized = await this.canUpdate(house, {}, requester);
        if (authorized) {
            house.members = house.members.filter(member => member != userId);
            return house.save();
        }

        throw new ForbiddenError(`Not allowed to update this house!`);
    }

    /**
     * Verify that the currently authenticated user can administer the provided house.
     *
     * @param userId the user id to check
     * @param house the house to check
     * @returns {boolean}
     * @private
     */
    _isAdmin(userId: string, house: mongoose.MongooseDocument) {
        return !!(userId && house.administrators.find(admin => admin == userId));
    }

    /**
     * Verify that the currently authenticated user can administer the provided house.
     *
     * @param userId the user id to check
     * @param house the house to check
     * @returns {boolean}
     * @private
     */
    _isMember(userId: string, house: mongoose.MongooseDocument) {
        return !!(userId && house.members.find(member => member == userId));
    }

    /**
     * Can the requesting user get an entity of this type?
     *
     * @param doc the fetched document
     * @param requester the requesting user id
     * @returns {boolean}
     */
    async canGet(doc: mongoose.MongooseDocument, requester: string) {
        return this._isAdmin(requester, doc) || this._isMember(requester, doc);
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
        return this._isAdmin(requester, doc);
    }

    /**
     * Can the requesting user delete an entity of this type?
     *
     * @param doc the document to delete
     * @param requester the requesting user id
     * @returns {boolean}
     */
    async canDelete(doc: mongoose.MongooseDocument, requester: string) {
        return this._isAdmin(requester, doc);
    }
}

// export a singleton HouseModel.
const resource = new HouseModel();
export default resource;
