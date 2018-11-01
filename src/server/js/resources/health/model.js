import mongoose from 'mongoose';

const HealthSchema = new mongoose.Schema({
    checkedOn: { type: Date, default: Date.now },
});

export default mongoose.model('HealthModel', HealthSchema);
