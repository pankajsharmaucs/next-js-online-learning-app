import mongoose from 'mongoose';

const AssessmentSchema = new mongoose.Schema({
  assessment_id: { type: Number, required: true },
  chapter_id: { type: Number, required: true },
  title: { type: String },
  // Other fields for the assessment
});

export default mongoose.models.Assessment || mongoose.model('Assessment', AssessmentSchema);
