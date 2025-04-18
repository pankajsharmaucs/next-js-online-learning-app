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
        const [rows] = await db.query('SELECT * FROM education_boards');
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
        const { board_name, image, linkTo } = await req.json();
        const db = await connectDB();

        const [result] = await db.query(
            'INSERT INTO education_boards (board_name, image, linkTo) VALUES (?, ?, ?)',
            [board_name, image, linkTo]
        );

        return NextResponse.json({ message: 'Board added', id: (result as any).insertId });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding board', details: error }, { status: 500 });
    }
}

// PUT: Update a board
export async function PUT(req: NextRequest) {
    if (!validateSuperAdmin(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { board_id, board_name, image, linkTo } = await req.json();

        if (!board_id) {
            return NextResponse.json({ error: 'board_id is required' }, { status: 400 });
        }

        const db = await connectDB();

        // Fetch existing record
        const [existingRows]: any = await db.query(
            'SELECT * FROM education_boards WHERE board_id = ?',
            [board_id]
        );

        if (existingRows.length === 0) {
            return NextResponse.json({ error: 'Board not found' }, { status: 404 });
        }

        const existing = existingRows[0];

        // Use existing values if fields are missing or empty
        const updatedBoardName = board_name?.trim() || existing.board_name;
        const updatedImage = image?.trim() || existing.image;
        const updatedLinkTo = linkTo?.trim() || existing.linkTo;

        await db.query(
            'UPDATE education_boards SET board_name = ?, image = ?, linkTo = ? WHERE board_id = ?',
            [updatedBoardName, updatedImage, updatedLinkTo, board_id]
        );

        return NextResponse.json({ message: 'Board updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating board', details: error }, { status: 500 });
    }
}

// DELETE: Delete a board
export async function DELETE(req: NextRequest) {
    if (!validateSuperAdmin(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { board_id } = await req.json();
        const db = await connectDB();

        await db.query('DELETE FROM education_boards WHERE board_id = ?', [board_id]);

        return NextResponse.json({ message: 'Board deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting board', details: error }, { status: 500 });
    }
}
