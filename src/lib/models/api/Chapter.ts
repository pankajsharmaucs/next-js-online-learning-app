import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema({
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  chapter_name: { type: String, required: true },
  summary: { type: String },
  video_url: { type: String },
  pdf: { type: String },
  is_visible: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema);
