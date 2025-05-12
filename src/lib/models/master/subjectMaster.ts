import mongoose from 'mongoose';

const subjectMasterSchema = new mongoose.Schema({
  subject_name: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.models.subjectMaster || mongoose.model('subjectMaster', subjectMasterSchema);
