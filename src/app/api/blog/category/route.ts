import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

// Helper to validate superadmin token
const validateSuperAdmin = (req: NextRequest) => {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1]; // Expected format: Bearer <token>
    return token === process.env.SUPERADMIN_TOKEN;
};

// GET: Fetch all education boards
export async function GET(req: NextRequest) {
    try {
        const db = await connectDB();
        const [rows] = await db.query('SELECT * FROM blog_category');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching blog category', details: error }, { status: 500 });
    }
}

// POST: Add a new board
export async function POST(req: NextRequest) {
    // if (!validateSuperAdmin(req)) {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    try {
        const { cat_name } = await req.json();
        const db = await connectDB();

        // Fetch existing record
        const [existingRows]: any = await db.query(
            'SELECT * FROM blog_category WHERE cat_name = ?', [cat_name]
        );

        if (existingRows.length > 0) {
            return NextResponse.json({ error: 'cat_name Already exist' }, { status: 400 });
        }

        const [result] = await db.query(
            'INSERT INTO blog_category (cat_name) VALUES (?)', [cat_name]
        );

        return NextResponse.json({ message: 'category added', id: (result as any).insertId });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding category', details: error }, { status: 500 });
    }
}

// PUT: Update a board
export async function PUT(req: NextRequest) {
    // if (!validateSuperAdmin(req)) {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    try {
        const { cat_id, cat_name } = await req.json();

        if (!cat_id && !cat_name) {
            return NextResponse.json({ error: 'cat_id and cat_name are required' }, { status: 400 });
        }

        const db = await connectDB();

        // Fetch existing record
        const [existingRows]: any = await db.query(
            'SELECT * FROM blog_category WHERE cat_id = ?', [cat_id]
        );

        if (existingRows.length === 0) {
            return NextResponse.json({ error: 'cat_id not found' }, { status: 404 });
        }

        const existing = existingRows[0];

        // Use existing values if fields are missing or empty
        const updatedcat_name = cat_name?.trim() || existing.cat_name;

        await db.query(
            'UPDATE blog_category SET cat_name = ?  WHERE cat_id = ?', [updatedcat_name, cat_id]
        );

        return NextResponse.json({ message: 'category updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating category', details: error }, { status: 500 });
    }
}

// DELETE: Delete a board
export async function DELETE(req: NextRequest) {
    // if (!validateSuperAdmin(req)) {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    try {
        const { cat_id } = await req.json();
        const db = await connectDB();

        await db.query('DELETE FROM blog_category WHERE cat_id = ?', [cat_id]);

        return NextResponse.json({ message: 'category deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting category', details: error }, { status: 500 });
    }
}

