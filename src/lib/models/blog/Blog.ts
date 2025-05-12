// @/lib/models/Blog.ts
import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    cat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogCategory', required: true },
    title: { type: String, required: true },
    slug: { type: String },
    description1: { type: String },
    image1: { type: String },
    description2: { type: String },
    create_date: { type: String },
    update_date: { type: String }
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
