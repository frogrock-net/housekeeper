import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, lowercase: true, trim: true },
    lastName: { type: String, required: true, lowercase: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
});

export default mongoose.model('UserModel', UserSchema);
