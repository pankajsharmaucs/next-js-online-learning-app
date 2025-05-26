import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import BlogCategory from '@/lib/models/blog/BlogCategory';

// GET: Fetch all categories
export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const categories = await BlogCategory.find({});
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching blog categories', details: (error as Error).message },
            { status: 500 }
        );
    }
}

// POST: Add a new category
export async function POST(req: NextRequest) {
    try {
        const { cat_name } = await req.json();
        if (!cat_name) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
        }

        await connectDB();
        const existing = await BlogCategory.findOne({ cat_name });
        if (existing) {
            return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
        }

        const newCategory = new BlogCategory({ cat_name });
        await newCategory.save();

        return NextResponse.json(newCategory);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error adding category', details: (error as Error).message },
            { status: 500 }
        );
    }
}

// PUT: Update a category
export async function PUT(req: NextRequest) {
    try {
        const { cat_id, cat_name } = await req.json();
        if (!cat_id || !cat_name) {
            return NextResponse.json({ error: 'cat_id and cat_name are required' }, { status: 400 });
        }

        await connectDB();
        const category = await BlogCategory.findById(cat_id);
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        category.cat_name = cat_name.trim();
        await category.save();

        return NextResponse.json({ message: 'Category updated successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error updating category', details: (error as Error).message },
            { status: 500 }
        );
    }
}

// DELETE: Delete a category
export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        const deleted = await BlogCategory.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Category deleted" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}