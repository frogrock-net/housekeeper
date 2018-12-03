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
    createRoom: (root, args) => {
        const { capacity, description, house } = args;
        const room = RoomModel({ capacity, description, house });

        room.save(err => {
            if (err) {
                next(err);
            }
        });

        return room.id;
    },
    updateRoom: (root, args) => {
        return RoomModel.findByIdAndUpdate(args.id, args, { new: true }).exec();
    },
    deleteRoom: (root, args) => {
        return RoomModel.findByIdAndDelete(args.id).exec();
    },
};

export default endpoints;
