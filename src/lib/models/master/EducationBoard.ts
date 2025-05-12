import mongoose from 'mongoose';

const educationBoardSchema = new mongoose.Schema({
    board_name: { type: String, required: true, unique: true },
    image: { type: String },
    linkTo: { type: String },
    is_visible: { type: Boolean, default: true },
});

const EducationBoard = mongoose.models.EducationBoard || mongoose.model('EducationBoard', educationBoardSchema);

export default EducationBoard;
