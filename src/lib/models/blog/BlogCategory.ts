import mongoose from 'mongoose';

const BlogCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String },
    create_date: { type: String },
    update_date: { type: String }
});

export default mongoose.models.BlogCategory || mongoose.model('BlogCategory', BlogCategorySchema);

 