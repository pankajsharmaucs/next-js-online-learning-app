import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  blogtitle: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  blogcontent: { type: String, required: true },
  createdate: { type: Date, default: Date.now },
  category: { type: String, required: true },
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
