// models/Chapter.ts

import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema(
  {
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    chapter_name: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
    video_url: {
      type: String,
    },
    pdf: {
      type: String, // ✅ URL or file path to the uploaded PDF
    },
  },
  { timestamps: true }
);

export default mongoose.models.Chapter || mongoose.model('Chapter', chapterSchema);
