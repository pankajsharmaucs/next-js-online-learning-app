import mongoose from 'mongoose';

const SoldClassSchema = new mongoose.Schema({
  class_id: { type: String, required: true },
  user_id: { type: String, required: true },
  purchase_date: { type: Date, required: true },
  validity: { type: Number, required: true },
  update_date: { type: Date, default: Date.now },
  activeStatus: { type: Number, default: 1 },
});

export default mongoose.models.SoldClass || mongoose.model('SoldClass', SoldClassSchema);
