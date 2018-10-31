import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, lowercase: true, trim: true },
    lastName: { type: String, required: true, lowercase: true, trim: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email address`,
        },
    },
});

export default mongoose.model('UserModel', UserSchema);
