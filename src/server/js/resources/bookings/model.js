import mongoose from 'mongoose';
import { values } from 'lodash';
import moment from 'moment';

const BOOKING_STATUSES = {
    APPROVED: 'APPROVED',
    DENIED: 'DENIED',
    PENDING: 'PENDING',
};

const BookingSchema = new mongoose.Schema({
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
        enum: values(BOOKING_STATUSES),
        default: BOOKING_STATUSES.PENDING,
    },
});

export default mongoose.model('BookingModel', BookingSchema);
