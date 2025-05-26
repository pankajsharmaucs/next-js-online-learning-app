import mongoose from 'mongoose';

const BlogCategorySchema = new mongoose.Schema({
  cat_name: { type: String, required: true },
  icon: { type: String }
});

// ✅ Safely reset the model if it already exists (for hot-reload dev environments)
export default mongoose.models.BlogCategory ||
  mongoose.model('BlogCategory', BlogCategorySchema);
