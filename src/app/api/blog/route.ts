import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import slugify from "slugify";
import { connectDB } from "@/lib/mongo_db";
import Blog from "@/lib/models/blog/Blog";
import { validateSuperAdmin } from "@/lib/apiValidator";

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

    const query = Blog.find().populate("category");
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
    const slug = formData.get("slug") || slugify(blogtitle, { lower: true, strict: true });
    const blogcontent = formData.get("blogcontent");
    const createdate = formData.get("createdate") || new Date();
    const category = formData.get("category") || formData.get("cat_id");

    if (!category) {
      return NextResponse.json({ error: "category is required" }, { status: 400 });
    }

    const duplicate = await Blog.findOne({ slug });
    if (duplicate) return NextResponse.json({ error: "Slug already exists" }, { status: 400 });

    const blog = await Blog.create({
      blogtitle,
      slug,
      blogcontent,
      createdate,
      category,
    });

    return NextResponse.json({ message: "Blog created", id: blog._id });
  } catch (error) {
    return NextResponse.json({ error: "Error creating blog", details: (error as Error).message }, { status: 500 });
  }
}

// PUT: Update blog
export async function PUT(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();
    const blogId = formData.get("blog_id") as string;
    const existing = await Blog.findById(blogId);
    if (!existing) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    const imageFile = formData.get("image");
    let imageUrl = existing.image;

    if (imageFile instanceof File && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await mkdir(uploadDir, { recursive: true });
      const fileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }

    const updates = {
      blogtitle: formData.get("blogtitle") || existing.blogtitle,
      slug: formData.get("slug") || existing.slug,
      blogcontent: formData.get("blogcontent") || existing.blogcontent,
      category: formData.get("category") || existing.category,
      createdate: formData.get("createdate") || existing.createdate,
      image: imageUrl,
    };

    Object.assign(existing, updates);
    await existing.save();

    return NextResponse.json({ message: "Blog updated", id: existing._id });
  } catch (error) {
    return NextResponse.json({ error: "Error updating blog", details: (error as Error).message }, { status: 500 });
  }
}

// DELETE: Delete blog
export async function DELETE(req: NextRequest) {
  await connectDB();

  try {
    if (!(await validateSuperAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    return NextResponse.json({ message: "Blog deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting blog", details: (error as Error).message }, { status: 500 });
  }
}
