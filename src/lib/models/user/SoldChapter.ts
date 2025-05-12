// models/SoldChapter.ts
import mongoose from 'mongoose';

const SoldChapterSchema = new mongoose.Schema({
  chapter_id: String,
  subject_id: String,
  user_id: String,
  purchase_date: Date,
  validity: Number,
  update_date: Date,
  activeStatus: { type: Number, default: 1 },
});

export default mongoose.models.SoldChapter || mongoose.model('SoldChapter', SoldChapterSchema);
