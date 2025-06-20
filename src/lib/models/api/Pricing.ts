import mongoose from 'mongoose';

const PricingSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  subject_price: { type: String, required: true },
  class_price: { type: String, required: true },
  monthly_price: { type: String, required: true },
  yearly_price: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'pricings' 
});

export default mongoose.models.Pricing || mongoose.model('Pricing', PricingSchema);
