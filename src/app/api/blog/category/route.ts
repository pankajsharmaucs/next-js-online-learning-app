import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import BlogCategory from '@/lib/models/blog/BlogCategory';
// import { validateSuperAdmin } from '@/lib/apiValidator';

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
    // if (!(await validateSuperAdmin(req))) {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    try {
        const { name } = await req.json();
        if (!name) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
        }

        await connectDB();
        const existing = await BlogCategory.findOne({ name });
        if (existing) {
            return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
        }

        const newCategory = new BlogCategory({ name });
        await newCategory.save();

        return NextResponse.json({ message: 'Category added', id: newCategory._id });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error adding category', details: (error as Error).message },
            { status: 500 }
        );
    }
}

// PUT: Update a category
export async function PUT(req: NextRequest) {
    // if (!(await validateSuperAdmin(req))) {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    try {
        const { cat_id, name } = await req.json();
        if (!cat_id || !name) {
            return NextResponse.json({ error: 'cat_id and name are required' }, { status: 400 });
        }

        await connectDB();
        const category = await BlogCategory.findById(cat_id);
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        category.name = name.trim();
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
    // if (!(await validateSuperAdmin(req))) {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    try {
        const { cat_id } = await req.json();
        if (!cat_id) {
            return NextResponse.json({ error: 'cat_id is required' }, { status: 400 });
        }

        await connectDB();
        await BlogCategory.findByIdAndDelete(cat_id);

        return NextResponse.json({ message: 'Category deleted' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error deleting category', details: (error as Error).message },
            { status: 500 }
        );
    }
}
