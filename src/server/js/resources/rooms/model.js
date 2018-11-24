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
    getAll: () => {
        return RoomModel.find().exec();
    },
    getAllRoomsByHouse: houseId => {
        return RoomModel.find({ house: houseId }).exec();
    },
};

export default endpoints;
