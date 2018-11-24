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
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
            required: true,
        },
    ],
    name: { type: String, required: true },
});

const HouseModel = mongoose.model('HouseModel', HouseSchema);
const endpoints = {
    getAll: () => {
        return HouseModel.find();
    },
    getHousesByAdministrator: adminId => {
        return HouseModel.find();
    },
};
export default endpoints;
