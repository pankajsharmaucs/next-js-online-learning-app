import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

// Helper to validate superadmin token
const validateSuperAdmin = (req: NextRequest) => {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1]; // Expected format: Bearer <token>
    return token === process.env.SUPERADMIN_TOKEN;
};

// GET: Fetch all classes by Board ID
export async function GET(req: NextRequest) {
    try {

        const board_id = req.nextUrl.searchParams.get('board_id');

        const db = await connectDB();
        const [rows] = await db.query(
            'SELECT * FROM classes WHERE board_id = ?', [board_id]
        );
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data', details: error }, { status: 500 });
    }
}

// POST: Add a new board
export async function POST(req: NextRequest) {
    if (!validateSuperAdmin(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { class_name, board_id } = await req.json();
        const db = await connectDB();

        const [result] = await db.query(
            'INSERT INTO classes (class_name, board_id) VALUES (?, ?)', [class_name, board_id]
        );

        return NextResponse.json({ message: 'class added', id: (result as any).insertId });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding class', details: error }, { status: 500 });
    }
}

// PUT: Update a board
export async function PUT(req: NextRequest) {
    if (!validateSuperAdmin(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { class_name, class_id  } = await req.json();

        if (!class_id) {
            return NextResponse.json({ error: 'class_id is required' }, { status: 400 });
        }

        const db = await connectDB();

        // Fetch existing record
        const [existingRows]: any = await db.query(
            'SELECT * FROM classes WHERE class_id = ?', [class_id]
        );

        if (existingRows.length === 0) {
            return NextResponse.json({ error: 'Class not found' }, { status: 404 });
        }

        const existing = existingRows[0];

        // Use existing values if fields are missing or empty
        const updatedClass_name = class_name?.trim() || existing.class_name;

        await db.query(
            'UPDATE classes SET class_name = ?,  WHERE class_id = ?',
            [updatedClass_name, class_id]
        );

        return NextResponse.json({ message: 'Class updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating class', details: error }, { status: 500 });
    }
}

// DELETE: Delete a board
export async function DELETE(req: NextRequest) {
    if (!validateSuperAdmin(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { class_id } = await req.json();
        const db = await connectDB();

        await db.query('DELETE FROM classes WHERE class_id = ?', [class_id]);

        return NextResponse.json({ message: 'Class deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting class', details: error }, { status: 500 });
    }
}
