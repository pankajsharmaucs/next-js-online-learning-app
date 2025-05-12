import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
    class_id: { type: String, required: true },
    subject_name: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);
