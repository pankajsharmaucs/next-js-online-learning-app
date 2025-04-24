import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

// Helper to validate superadmin token
import { validateSuperAdmin } from '@/lib/apiValidator';

// GET: Fetch all education boards
export async function GET(req: NextRequest) {
    try {
        const db = await connectDB();
        const [rows] = await db.query('SELECT * FROM class_master');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data', details: error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {

        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { class_name } = await req.json();
        const db = await connectDB();

        const [result]: any = await db.query(
            'INSERT INTO class_master (class_name) VALUES (?)',
            [class_name]
        );

        return NextResponse.json({ message: 'CLass  added', insertId: result.insertId });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error adding CLass ', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {

        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id, class_name } = await req.json();
        const db = await connectDB();

        // Fetch the existing record
        const [existingRows]: any = await db.query('SELECT * FROM class_master WHERE id = ?', [id]);

        if (existingRows.length === 0) {
            return NextResponse.json({ error: 'class not found' }, { status: 404 });
        }
        
        const existing = existingRows[0];
        const updatedclass_name = typeof class_name === 'string' ? class_name.trim() : existing.class_name;

        await db.query(
            'UPDATE class_master SET class_name = ? WHERE id = ?',
            [updatedclass_name, id]
        );

        return NextResponse.json({ message: 'Class updated' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error updating Class', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {

        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await req.json();
        const db = await connectDB();

        await db.query('DELETE FROM class_master WHERE id = ?', [id]);

        return NextResponse.json({ message: 'Class deleted' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error deleting Class', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}

