import mongoose from 'mongoose';

const SoldClassSchema = new mongoose.Schema({
  class_id: { type: String, required: true },
  user_id: { type: String, required: true },
  purchase_date: { type: String },
  validity: { type: String },
  update_date: { type: String },
  create_date: { type: String },
  activeStatus: { type: Number, default: 1 },
});

export default mongoose.models.SoldClass || mongoose.model('SoldClass', SoldClassSchema);
