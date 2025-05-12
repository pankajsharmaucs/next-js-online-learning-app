import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import BlogModel from '@/lib/models/blog/Blog';
import { validateSuperAdmin } from '@/lib/apiValidator';

// GET: Fetch blogs
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get('blog_id');
    const limit = parseInt(searchParams.get('limit') || '', 10);
    const cat_id = searchParams.get('cat_id');

    try {
        if (blogId) {
            const blog = await BlogModel.findById(blogId);
            if (!blog) {
                return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
            }
            return NextResponse.json(blog);
        }

        if (limit && limit > 0) {
            const blogs = await BlogModel.find().limit(limit);
            return NextResponse.json(blogs);
        }

        if (cat_id) {
            const blogs = await BlogModel.find({ cat_id });
            if (!blogs.length) {
                return NextResponse.json({ error: 'No blogs found for this category' }, { status: 404 });
            }
            return NextResponse.json(blogs);
        }

        const allBlogs = await BlogModel.find();
        return NextResponse.json(allBlogs);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching blog(s)', details: (error as Error).message }, { status: 500 });
    }
}

// POST: Create blog
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const cat_id = formData.get('cat_id');
        const title = formData.get('title') as string;
        const slug = formData.get('slug');
        const description1 = formData.get('description1');
        const description2 = formData.get('description2');
        const create_date = formData.get('create_date');
        const imageFile = formData.get('image1');

        // Handle file upload
        let imageUrl = '';
        if (imageFile instanceof File) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const uploadDir = path.join(process.cwd(), 'public/uploads');
            await mkdir(uploadDir, { recursive: true });
            const fileName = `${Date.now()}-${imageFile.name}`;
            const filePath = path.join(uploadDir, fileName);
            await writeFile(filePath, buffer);
            imageUrl = `/uploads/${fileName}`;
        }

        const existing = await BlogModel.findOne({ cat_id, title });
        if (existing) {
            return NextResponse.json({ error: 'Blog title already exists in this category' }, { status: 400 });
        }

        const blog = new BlogModel({
            cat_id,
            title,
            slug,
            description1,
            image1: imageUrl,
            description2,
            create_date,
        });

        await blog.save();
        return NextResponse.json({ message: 'Blog added', id: blog._id });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding blog', details: (error as Error).message }, { status: 500 });
    }
}

// PUT: Update blog
export async function PUT(req: NextRequest) {
    try {
        const formData = await req.formData();
        const blog_id = formData.get('blog_id') as string;

        const existing = await BlogModel.findById(blog_id);
        if (!existing) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const imageFile = formData.get('image1');
        let imageUrl = existing.image1;

        if (imageFile instanceof File) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const uploadDir = path.join(process.cwd(), 'public/uploads');
            await mkdir(uploadDir, { recursive: true });
            const fileName = `${Date.now()}-${imageFile.name}`;
            const filePath = path.join(uploadDir, fileName);
            await writeFile(filePath, buffer);
            imageUrl = `/uploads/${fileName}`;
        }

        const updatedData = {
            title: formData.get('title') || existing.title,
            slug: formData.get('slug') || existing.slug,
            description1: formData.get('description1') || existing.description1,
            image1: imageUrl,
            description2: formData.get('description2') || existing.description2,
            update_date: formData.get('update_date') || existing.update_date,
            cat_id: formData.get('cat_id') || existing.cat_id,
        };

        Object.assign(existing, updatedData);
        await existing.save();

        return NextResponse.json({ message: 'Blog updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating blog', details: (error as Error).message }, { status: 500 });
    }
}

// DELETE: Soft delete or hard delete blog
export async function DELETE(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { blog_id } = await req.json();

        const deleted = await BlogModel.findByIdAndDelete(blog_id);
        if (!deleted) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting blog', details: (error as Error).message }, { status: 500 });
    }
}
