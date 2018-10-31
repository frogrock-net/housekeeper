import mongoose from 'mongoose';

const HouseSchema = new mongoose.Schema({
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
    },
    name: { type: String, required: true },
    rooms: [
        {
            description: { type: String, required: true },
            capacity: { type: Number, min: 1, required: true },
        },
    ],
    administrators: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
});

export default mongoose.model('HouseModel', HouseSchema);
