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
    introduction: {
      type: String,  
    },
    summary: {
      type: String, 
    },
    moral: {
      type: String,  
    },
    video_url: {
      type: String,
    },
    video_access: {
      type: String,
      enum: ['free', 'paid'], // 🆕 Free/Paid option for video
      default: 'free',
    },
    assignment_access: {
      type: String,
      enum: ['free', 'paid'], // 🆕 Free/Paid option for assignment
      default: 'free',
    },
    pdf: {
      type: String, // ✅ File path or URL
    },
  },
  { timestamps: true }
);

export default mongoose.models.Chapter || mongoose.model('Chapter', chapterSchema);
