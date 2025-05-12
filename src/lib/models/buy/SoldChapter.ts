import mongoose from 'mongoose';

const SoldChapterSchema = new mongoose.Schema({
  chapter_id: { type: String, required: true },
  subject_id: { type: String, required: true },
  user_id: { type: String, required: true },
  purchase_date: { type: String },
  validity: { type: String },
  create_date: { type: String },
  update_date: { type: String },
  activeStatus: { type: Number, default: 1 },
});

export default mongoose.models.SoldChapter || mongoose.model('SoldChapter', SoldChapterSchema);
