import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    capacity: { type: Number, min: 1, required: true },
    description: { type: String, required: true },
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HouseModel',
        required: true,
    },
});

const RoomModel = mongoose.model('RoomModel', RoomSchema);
const endpoints = {
    create: args => {
        const { capacity, description, house } = args;
        return RoomModel({ capacity, description, house }).save();
    },

    delete: args => {
        return RoomModel.findByIdAndDelete(args.id).exec();
    },

    get: id => RoomModel.findById(id).exec(),

    getAll: () => {
        return RoomModel.find().exec();
    },

    getAllRoomsByHouse: args => {
        return RoomModel.find({ house: args.houseId }).exec();
    },

    update: args => {
        return RoomModel.findByIdAndUpdate(args.id, args, { new: true }).exec();
    },
};

export default endpoints;
