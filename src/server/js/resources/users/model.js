import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
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
    firstName: { type: String, required: true, lowercase: true, trim: true },
    lastName: { type: String, required: true, lowercase: true, trim: true },
});

UserSchema.virtual('fullName').get(() => `${this.firstName} ${this.lastName}`);

export default mongoose.model('UserModel', UserSchema);
