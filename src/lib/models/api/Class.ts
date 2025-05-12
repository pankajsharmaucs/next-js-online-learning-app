import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  class_name: { type: String, required: true },
  board_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
});

export default mongoose.models.Class || mongoose.model('Class', classSchema);
