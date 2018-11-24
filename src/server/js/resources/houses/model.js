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
    create: (houseData, creatorId) => {
        const house = HouseModel(houseData);
        house.administrators = [creatorId];
        return house.save(err => {
            if (err) {
                throw new Error(err);
            }
        });
    },

    delete: id => HouseModel.findByIdAndRemove(id).exec(),

    get: id => HouseModel.findById(id).exec(),

    getAll: () => {
        return HouseModel.find().exec();
    },
    getHousesByAdministrator: adminId => {
        return HouseModel.find({ administrators: adminId }).exec();
    },
};
export default endpoints;
