import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

// Helper to validate superadmin token
import { validateSuperAdmin } from '@/lib/apiValidator';

// GET: Fetch all education boards
export async function GET(req: NextRequest) {
    try {
        const db = await connectDB();
        const [rows] = await db.query('SELECT * FROM subject_master');
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

        const { subject_name } = await req.json();
        const db = await connectDB();

        const [result]: any = await db.query(
            'INSERT INTO subject_master (subject_name) VALUES (?)',
            [subject_name]
        );

        return NextResponse.json({ message: 'Subject  added', insertId: result.insertId });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error adding Subject ', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {

        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id, subject_name } = await req.json();
        const db = await connectDB();

        // Fetch the existing record
        const [existingRows]: any = await db.query('SELECT * FROM subject_master WHERE id = ?', [id]);

        if (existingRows.length === 0) {
            return NextResponse.json({ error: 'class not found' }, { status: 404 });
        }
        
        const existing = existingRows[0];
        const updatedsubject_name = typeof subject_name === 'string' ? subject_name.trim() : existing.subject_name;


        await db.query(
            'UPDATE subject_master SET subject_name = ? WHERE id = ?',
            [updatedsubject_name, id]
        );

        return NextResponse.json({ message: 'Subject updated' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error updating Subject', details: error.message }, { status: 500 });
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

        await db.query('DELETE FROM subject_master WHERE id = ?', [id]);

        return NextResponse.json({ message: 'Subject deleted' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error deleting Subject', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}

