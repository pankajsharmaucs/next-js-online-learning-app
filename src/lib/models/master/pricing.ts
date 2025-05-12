import mongoose from 'mongoose';

const PricingSchema = new mongoose.Schema({
    plan_name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.PricingPlan || mongoose.model('PricingPlan', PricingSchema);
