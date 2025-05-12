// /lib/models/QuestionAnswer.ts
import mongoose from 'mongoose';

// Define the schema for question and answer collection
const QuestionAnswerSchema = new mongoose.Schema({
  chapter_id: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  options: { 
    type: [String], 
    required: true 
  }, // Assuming multiple options for each question
  correct_option: { type: String, required: true },
  // You can add other fields here if necessary
}, { timestamps: true });  // Optionally add timestamps to track createdAt and updatedAt

// Export the model for the 'QuestionAnswer' collection
export default mongoose.models.QuestionAnswer || mongoose.model('QuestionAnswer', QuestionAnswerSchema);
