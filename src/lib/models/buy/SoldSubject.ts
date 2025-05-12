import mongoose from 'mongoose';

const SoldSubjectSchema = new mongoose.Schema({
  subject_id: { type: String, required: true },
  class_id: { type: String },
  user_id: { type: String, required: true },
  purchase_date: { type: String },
  validity: { type: String },
  update_date: { type: String },
  create_date: { type: String },
  activeStatus: { type: Number, default: 1 },
});

export default mongoose.models.SoldSubject || mongoose.model('SoldSubject', SoldSubjectSchema);
