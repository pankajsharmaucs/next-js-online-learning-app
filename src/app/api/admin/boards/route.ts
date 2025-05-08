import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

// Helper to validate superadmin token
import { validateSuperAdmin } from '@/lib/apiValidator';

// GET: Fetch all education boards
export async function GET(req: NextRequest) {
    try {
        const db = await connectDB();
        const [rows] = await db.query('SELECT * FROM education_boards where is_visible = 1');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data', details: error }, { status: 500 });
    }
}

// POST: Add a new board
export async function POST(req: NextRequest) {
    try {

        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const { board_name, image } = await req.json();
        const db = await connectDB();

        // Fetch existing record
        const [existingRows]: any = await db.query(
            'SELECT * FROM education_boards WHERE board_name = ?',
            [board_name]
        );

        if (existingRows.length > 0) {
            return NextResponse.json({ error: 'Board Already Exist' }, { status: 409 });
        }

        const [result] = await db.query(
            'INSERT INTO education_boards (board_name, image) VALUES (?, ?)',
            [board_name, image]
        );

        return NextResponse.json({ message: 'Board added', id: (result as any).insertId });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding board', details: error }, { status: 500 });
    }
}

// PUT: Update a board
export async function PUT(req: NextRequest) {
    try {

        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
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
    try {

        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const { board_id } = await req.json();
        const db = await connectDB();

        await db.query('UPDATE education_boards SET is_visible = ? WHERE board_id = ?', [0, board_id]);

        return NextResponse.json({ message: 'Board Disabled' });
    } catch (error) {
        return NextResponse.json({ error: 'Error Disabled board', details: error }, { status: 500 });
    }
}
