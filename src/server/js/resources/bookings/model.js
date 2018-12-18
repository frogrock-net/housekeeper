// @flow
import mongoose from 'mongoose';
import BaseModel from '../model';
import moment from 'moment';
import { BOOKING_STATUSES } from '../../../../common/constants';

/**
 * The 'bookings' schema, as incompletely-implemented in MongoDB.
 */
const schema = new mongoose.Schema({
    booker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return moment(value).isAfter(this.startDate);
            },
            message: 'Start date must be after end date.',
        },
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomModel',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: value => !moment().isAfter(value),
            message: 'Start date cannot be before today.',
        },
    },
    status: {
        type: String,
        enum: Object.values(BOOKING_STATUSES),
        default: BOOKING_STATUSES.PENDING,
    },
});

/**
 * The 'booking' resource class.
 *
 * This is very incomplete.
 */
class BookingModel extends BaseModel {
    /**
     * Construct the booking resource class.
     *
     * Inherits 'create', 'patch', 'get', 'getAll', and 'delete' from the base BaseModel class.
     */
    constructor() {
        super(mongoose.model('BookingModel', schema));
    }

    /**
     * Get a list containing all bookings for the provided user.
     *
     * @param userId the user to filter
     */
    getByUser(userId: string) {
        return this.model.find({ booker: userId }).exec();
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

// export a singleton BookingModel.
const resource = new BookingModel();
export default resource;
