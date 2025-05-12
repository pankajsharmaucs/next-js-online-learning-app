import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    token: { type: String, required: false },
    active_status: { type: Number, required: true, default: 1 },
    created_by: { type: String, default: null },
    otp: { type: Number },
    otpVerified: { type: Boolean, default: false },
    otpExpires: { type: Date },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);