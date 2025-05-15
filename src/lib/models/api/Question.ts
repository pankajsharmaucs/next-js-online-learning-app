// models/Question.ts

import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    chapter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
    },
    question_text: {
      type: String,
      required: true,
    },
    answer_text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Question || mongoose.model('Question', questionSchema);
