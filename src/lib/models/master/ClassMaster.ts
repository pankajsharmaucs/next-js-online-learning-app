import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema(
    {
        class_name: { type: String, required: true },
    },
    { timestamps: true }
);

const ClassMaster = mongoose.models.ClassMaster || mongoose.model('ClassMaster', ClassSchema);

export default ClassMaster;
