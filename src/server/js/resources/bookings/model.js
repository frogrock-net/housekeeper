import mongoose from 'mongoose';
import { values } from 'lodash';

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
    endDate: { type: Date, required: true },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomModel',
        required: true,
    },
    startDate: { type: Date, required: true },
    status: {
        type: String,
        enum: values(BOOKING_STATUSES),
        default: BOOKING_STATUSES.PENDING,
    },
});

export default mongoose.model('BookingModel', BookingSchema);
