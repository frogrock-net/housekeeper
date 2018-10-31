import mongoose from 'mongoose';
import validator from 'validator';
import { partialRight } from 'lodash';

const HouseSchema = new mongoose.Schema({
    address: {
        street: String,
        city: String,
        state: String,
        zip: {
            type: String,
            validate: {
                validator: partialRight(validator.isPostalCode, 'US'),
                message: props => `${props.value} is not a valid US zipcode`,
            },
        },
    },
    administrators: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
    name: { type: String, required: true },
    rooms: [
        {
            description: { type: String, required: true },
            capacity: { type: Number, min: 1, required: true },
        },
    ],
});

export default mongoose.model('HouseModel', HouseSchema);
