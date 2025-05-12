import mongoose from 'mongoose';

const SoldSubjectSchema = new mongoose.Schema({
  subject_id: { type: String, required: true },
  class_id: { type: String, required: true },
  user_id: { type: String, required: true },
  purchase_date: { type: Date, required: true },
  validity: { type: Number, required: true },
  update_date: { type: Date, required: true },
  activeStatus: { type: Number, default: 1 }
});

export default mongoose.models.SoldSubject || mongoose.model('SoldSubject', SoldSubjectSchema);
