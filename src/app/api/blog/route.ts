import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import slugify from "slugify";
import { connectDB } from "@/lib/mongo_db";
import Blog from "@/lib/models/blog/Blog";
import { validateSuperAdmin } from "@/lib/apiValidator";
import { promises as fs } from "fs";
import mongoose from "mongoose";

// GET: Fetch blogs
export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const blogId = searchParams.get("blog_id");
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "", 10);

  try {
    if (blogId) {
      const blog = await Blog.findById(blogId).populate("category");
      if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      return NextResponse.json(blog);
    }

    if (category) {
      const blogs = await Blog.find({ category }).populate("category");
      if (!blogs.length) return NextResponse.json({ error: "No blogs found for this category" }, { status: 404 });
      return NextResponse.json(blogs);
    }

    const query = Blog.find().populate("category").sort({ createdAt: -1 });
    if (limit && limit > 0) query.limit(limit);
    const blogs = await query;
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching blogs", details: (error as Error).message }, { status: 500 });
  }
}

// POST: Create blog
export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();

    const blogtitle = formData.get("blogtitle") as string;
    const slug = (formData.get("slug") as string) || slugify(blogtitle, { lower: true, strict: true });
    const blogcontent = formData.get("blogcontent") as string;
    const createdate = formData.get("createdate") || new Date();
    const category = formData.get("category") as string;
    const image = formData.get("image") as File | null;

    // New: get tags (comma-separated string or multiple tags)
    let tagsRaw = formData.get("tags") as string | null; // e.g. "Art & Design, Education, Tips"
    let tags: string[] = [];
    if (tagsRaw) {
      tags = tagsRaw.split(",").map(t => t.trim()).filter(Boolean);
    }

    if (!image || !(image instanceof File) || image.size === 0) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const blogId = new mongoose.Types.ObjectId();

    const uploadDir = path.join(process.cwd(), "public", "uploads", "blog", category, blogId.toString());
    await mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}_${image.name}`;
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await image.arrayBuffer());

    await writeFile(filePath, buffer);

    const imagePath = `/uploads/blog/${category}/${blogId.toString()}/${fileName}`;

    const newBlog = new Blog({
      _id: blogId,
      blogtitle,
      slug,
      blogcontent,
      createdate,
      category,
      image: imagePath,
      tags, // save tags array here
    });

    await newBlog.save();

    return NextResponse.json(newBlog);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog", details: (error as Error).message }, { status: 500 });
  }
}


// PUT: Update blog
export async function PUT(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();
    const blog_id = formData.get("blog_id") as string;
    const blogtitle = formData.get("blogtitle") as string;
    const slug = (formData.get("slug") as string) || slugify(blogtitle, { lower: true, strict: true });
    const blogcontent = formData.get("blogcontent") as string;
    const createdate = formData.get("createdate") || new Date();
    const category = formData.get("category") as string;
    const image = formData.get("image") as File | null;

    // Get tags (assuming sent as JSON string or comma-separated string)
    const tagsRaw = formData.get("tags") as string | null;
    let tags: string[] = [];

    if (tagsRaw) {
      try {
        // Try parsing JSON array string first
        tags = JSON.parse(tagsRaw);
        if (!Array.isArray(tags)) {
          tags = [];
        }
      } catch {
        // Fallback: split by commas if not JSON
        tags = tagsRaw.split(",").map(tag => tag.trim()).filter(Boolean);
      }
    }

    const updateData: any = { blogtitle, slug, blogcontent, createdate, category, tags };

    // Fetch existing blog to delete old image if needed
    const existingBlog = await Blog.findById(blog_id);

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (image && typeof image === "object" && image.size > 0) {
      // Delete old image
      if (existingBlog.image) {
        const oldImagePath = path.join(process.cwd(), "public", existingBlog.image);
        try {
          await fs.unlink(oldImagePath);
        } catch (error) {
          console.warn("Failed to delete old image:", error);
        }
      }

      // Upload new image
      const buffer = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}_${image.name}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "blog", category, blog_id);
      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);

      updateData.image = `/uploads/blog/${category}/${blog_id}/${fileName}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blog_id, updateData, { new: true });
    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog", details: (error as Error).message }, { status: 500 });
  }
}


// ===Delete== 
export async function DELETE(req: NextRequest) {
  await connectDB();

  try {
    if (!(await validateSuperAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Delete image file if it exists
    if (blog.image) {
      const imagePath = path.join(process.cwd(), "public", blog.image);
      try {
        await fs.unlink(imagePath);
      } catch (fileError) {
        console.warn("Failed to delete image file:", fileError);
      }

      // Delete the folder that contains the image
      const folderPath = path.dirname(imagePath); // This will be the blog_id folder
      try {
        await fs.rm(folderPath, { recursive: true, force: true });
      } catch (folderError) {
        console.warn("Failed to delete image folder:", folderError);
      }
    }

    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: "Blog deleted" });

  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting blog", details: (error as Error).message },
      { status: 500 }
    );
  }
}
