import mongoose, { Schema } from 'mongoose';

const ChapterQuestionAnswerSchema = new Schema({
    chapterId: { type: mongoose.Types.ObjectId, required: true, ref: 'Chapter' },
    question: { type: String, required: true },
    answers: [{ type: String, required: true }],
});

export default mongoose.models.ChapterQuestionAnswer ||
    mongoose.model('ChapterQuestionAnswer', ChapterQuestionAnswerSchema);
