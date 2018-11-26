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

    update: (house, fields) => {
        if (!isUndefined(fields.administrators)) {
            house.administrators = fields.administrators;
        }

        if (!isUndefined(fields.name)) {
            house.name = fields.name;
        }

        const addressFields = ['street', 'city', 'state', 'zip'];
        map(addressFields, addressField => {
            if (!isUndefined(fields[addressField])) {
                house.address[addressField] = fields[addressField];
            }
        });

        return house.save();
    },
};
export default endpoints;
