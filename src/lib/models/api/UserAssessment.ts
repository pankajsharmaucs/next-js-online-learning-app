import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: String,
  selected: String,
  correct: String,
  options: [String],
});

const UserAssessmentSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    chapter_id: { type: String, required: true },
    assessment_id: { type: String, required: true },
    questions: [QuestionSchema],
    score: { type: Number, required: true }, // 🔥 FIXED HERE
  },
  { timestamps: true }
);

export default mongoose.models.UserAssessment || mongoose.model('UserAssessment', UserAssessmentSchema);
