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
}

// export a singleton BookingModel.
const resource = new BookingModel();
export default resource;
