import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Helper to validate superadmin token
const validateSuperAdmin = (req: NextRequest) => {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1]; // Expected format: Bearer <token>
    return token === process.env.SUPERADMIN_TOKEN;
};

// GET: Fetch all education boards

// GET: Fetch all blogs or one blog by ID
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get('blog_id');
    const limit = searchParams.get('limit');
    const parsedLimit = parseInt(limit || '', 10);
    const cat_id = searchParams.get('cat_id');

    try {
        const db = await connectDB();

        if (blogId) {
            const [rows]: any = await db.query('SELECT * FROM blog WHERE blog_id = ?', [blogId]);

            if (rows.length === 0) {
                return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
            }

            return NextResponse.json(rows[0]);
        }
        else if (parsedLimit) {
            const safeLimit = Number.isInteger(parsedLimit) && parsedLimit > 0 ? parsedLimit : 10;
            const [rows]: any = await db.query(
                `SELECT * FROM blog LIMIT ${safeLimit}`
            );

            if (rows.length === 0) {
                return NextResponse.json({ error: 'Blog not found of this cat id' }, { status: 404 });
            }

            return NextResponse.json(rows);
        }
        else if (cat_id) {
            const [rows]: any = await db.query('SELECT * FROM blog WHERE cat_id  = ?', [cat_id]);

            if (rows.length === 0) {
                return NextResponse.json({ error: 'Blog not found of this cat id' }, { status: 404 });
            }

            return NextResponse.json(rows);
        } else {
            const [rows] = await db.query('SELECT * FROM blog');
            return NextResponse.json(rows);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error fetching blog(s)', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}

// POST: Add a new board
export async function POST(req: NextRequest) {
    // if (!validateSuperAdmin(req)) {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    try {
        const formData = await req.formData();

        const cat_id = formData.get('cat_id');
        const title = formData.get('title');
        const slug = formData.get('slug');
        const description1 = formData.get('description1');
        const description2 = formData.get('description2');
        const create_date = formData.get('create_date');

        const imageFile = formData.get('image1');

        let imageUrl = '';

        if (imageFile && imageFile instanceof File) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());

            const uploadDir = path.join(process.cwd(), 'public/uploads');
            await mkdir(uploadDir, { recursive: true });

            const fileName = `${Date.now()}-${imageFile.name}`;
            const filePath = path.join(uploadDir, fileName);

            await writeFile(filePath, buffer);

            imageUrl = `/uploads/${fileName}`;
        }

        const db = await connectDB();

        const [existingRows]: any = await db.query(
            'SELECT * FROM blog WHERE cat_id = ? AND title = ?',
            [cat_id, title]
        );

        if (existingRows.length > 0) {
            return NextResponse.json(
                { error: 'Blog title in this category already exists' },
                { status: 400 }
            );
        }

        const [result]: any = await db.query(
            'INSERT INTO blog (cat_id, title, slug, description1, image1, description2, create_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [cat_id, title, slug, description1, imageUrl, description2, create_date]
        );

        // Result is an array of ResultSetHeader, so get the first element
        const insertId = result.insertId;

        return NextResponse.json({
            message: 'Blog added',
            id: insertId,
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error Adding blog', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}

// PUT: Update a board
export async function PUT(req: NextRequest) {
    // if (!validateSuperAdmin(req)) {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    try {
        const formData = await req.formData();  // Read FormData from request

        const blog_id = formData.get('blog_id');
        const title = formData.get('title');
        const slug = formData.get('slug');
        const description1 = formData.get('description1');
        const imageFile = formData.get('image1'); // Image file
        const description2 = formData.get('description2');
        const update_date = formData.get('update_date');
        const cat_id = formData.get('cat_id');  // Category ID if updating

        // Check for mandatory fields
        if (!title && !slug && !description1 && !imageFile && !description2 && !update_date && !cat_id) {
            return NextResponse.json({ error: 'Mandatory fields are required' }, { status: 400 });
        }

        const db = await connectDB();

        // Fetch the existing blog record
        const [existingRows]: any = await db.query('SELECT * FROM blog WHERE blog_id = ?', [blog_id]);

        if (existingRows.length === 0) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const existing = existingRows[0];

        // If a new category (cat_id) is provided, ensure it exists in blog_category table
        if (cat_id) {
            const [categoryRows]: any = await db.query('SELECT * FROM blog_category WHERE cat_id = ?', [cat_id]);
            if (categoryRows.length === 0) {
                return NextResponse.json({ error: 'Category ID does not exist in blog_category table' }, { status: 400 });
            }
        }

        // Handle image upload if a new image is provided
        let imageUrl = existing.image1;  // Default to existing image if no new one is provided

        if (imageFile && imageFile instanceof File) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());

            const uploadDir = path.join(process.cwd(), 'public/uploads');
            await mkdir(uploadDir, { recursive: true });

            const fileName = `${Date.now()}-${imageFile.name}`;
            const filePath = path.join(uploadDir, fileName);

            await writeFile(filePath, buffer);

            imageUrl = `/uploads/${fileName}`;  // Updated image URL
        }

        // Use existing values if fields are missing or empty
        const updatedTitle = typeof title === 'string' ? title.trim() : existing.title;
        const updatedSlug = typeof slug === 'string' ? slug.trim() : existing.slug;
        const updatedDescription1 = typeof description1 === 'string' ? description1.trim() : existing.description1;
        const updatedDescription2 = typeof description2 === 'string' ? description2.trim() : existing.description2;
        const updatedUpdateDate = typeof update_date === 'string' ? update_date.trim() : existing.update_date;
        const updatedCatId = cat_id || existing.cat_id;

        // Update the blog in the database
        await db.query(
            'UPDATE blog SET title = ?, slug = ?, description1 = ?, image1 = ?, description2 = ?, update_date = ?, cat_id = ? WHERE blog_id = ?',
            [updatedTitle, updatedSlug, updatedDescription1, imageUrl, updatedDescription2, updatedUpdateDate, updatedCatId, blog_id]
        );

        return NextResponse.json({ message: 'Blog updated successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error updating blog', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}

// DELETE: Delete a board
export async function DELETE(req: NextRequest) {
    if (!validateSuperAdmin(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { blog_id } = await req.json();
        const db = await connectDB();

        await db.query('DELETE FROM blog WHERE blog_id = ?', [blog_id]);

        return NextResponse.json({ message: 'blog deleted' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error deleting blog', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}
