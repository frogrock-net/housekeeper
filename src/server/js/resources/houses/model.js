import { concat, isUndefined, map, partialRight } from 'lodash';
import mongoose from 'mongoose';
import validator from 'validator';

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
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
            default: [],
        },
    ],
    name: { type: String, required: true },
});

const HouseModel = mongoose.model('HouseModel', HouseSchema);

const endpoints = {
    create: (houseData, creatorId) => {
        const house = HouseModel(houseData);
        house.administrators = [creatorId];
        return house.save();
    },

    delete: house => house.remove(),

    get: id => HouseModel.findById(id).exec(),

    getAll: () => HouseModel.find().exec(),

    getHousesByAdministrator: adminId => HouseModel.find({ administrators: adminId }).exec(),


    update: (house, fieldsToUpdate) => {
        const allowedFlatFields = ['administrators', 'members', 'name'];
        map(allowedFlatFields, field => {
            const newValue = fieldsToUpdate[field];
            if (!isUndefined(newValue)) {
                house[field] = newValue;
            }
        });

        const addressFields = ['street', 'city', 'state', 'zip'];
        map(addressFields, addressField => {
            if (!isUndefined(fieldsToUpdate[addressField])) {
                house.address[addressField] = fieldsToUpdate[addressField];
            }
        });

        return house.save();
    },
};
export default endpoints;
